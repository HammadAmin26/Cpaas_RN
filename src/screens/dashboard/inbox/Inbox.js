import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableHighlightBase,
} from 'react-native';
import {connect} from 'react-redux';

import * as PUBSUB from "PubSub";
// import * as vidtok from "vidtok";
import Container from '../../../components/Container';
import Toast, {DURATION} from 'react-native-easy-toast';
import AppHeader from '../../../components/AppHeader';
import Spinner from 'react-native-spinkit';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen/index';
import Fonts from '../../../themes/Fonts';
import ResponsiveText from '../../../components/ResponsiveText';
import ChatCard from '../../../components/ChatCard';
import User from '../../../services/User';
import {userConstants} from '../../../../Shared/Constants/States/user';
import {Colors} from '../../../themes/Colors';
import UserCard from '../../../components/UserCard';
import InputField from '../../../components/InputField';
import {GetArrayFromObjOfArray,CheckIndexOfArray,SingleValuefromObjectArray} from "../../../../Shared/Helpers/ArrayHelper";
import SubscriberServie from "../../../../Shared/Services/SubscriberServie";

import MessageService from "../../../../Shared/Services/Message";

const toastStyle = {
  backgroundColor: 'red',
  width: 300,
  height: Platform.OS === 'ios' ? 50 : 100,
  color: '#ffffff',
  fontSize: 15,
  lineHeight: 2,
  lines: 4,
  borderRadius: 15,
  fontWeight: 'bold',
  yOffset: 40,
};
class Inbox extends React.Component {
  constructor(props) {
    super(props);
    // this.selectedUsersRef = React.createRef();

    this.state = {
      loading: true,
      addUserModal: false,
      users: [],
      searchText: '',
      userLoading: false,
      selectedUsers: [],
      grouptitle: '',
    };
  }
  // this.selectedUsersRef.current=this.state.selectedUsers
  UNSAFE_componentWillMount() {
    // this.props.dispatch({ type: "CURRENT_MESSAGES", messages: [] });
    this.__SetEvents();
    // this.video_register()
  }

  componentDidMount() {
    this.__SetChannels();
    console.log("this is client==>",this.Client)
  }

  __SetChannels() {
    this.__GetGroups();
  }

  __SetEvents = () => {
    this.Client = new PUBSUB.Client({
      host: 'ws://emit1.togee.io',
      port: '8080',
      credentials: {
        username:this.props.user.user && this.props.user.user.username,
        password: "",
      },
      reConnectivity: true,
      secret: "cWV91camkwd99XO9rvHmamvXxGdyeHK5",
    });
    this.Client.on("connect", (res) => {
      console.log("====Connect", res);
    });
    this.Client.on("disconnect", (res) => {
      console.log("====disconnect", res);
    });
    this.Client.on("subscribed", (res) => {
      console.log("====Connect Subs==", res);
      SubscriberServie.SetSubscribers(this.props, res);

    });
    this.Client.on("messagesent", (res) => {
      SubscriberServie.SetOnline(this.props, res);

    });
    this.Client.on("online", (res) => {
      SubscriberServie.SetOnline(this.props, res);

    });
    this.Client.on("offline", (res) => {
      SubscriberServie.SetOffline(this.props, res);
    });
    this.Client.on("message", (res) => {
      console.log("New Message-->",res);
      MessageService.SetMessage(this.Client, res, this.props);
    });
    this.Client.on("create", (res) => {
    });
  };

  __GetGroups() {
    User.getGroups(this.props.user.user.auth_token)
      .then((resChannels) => {
        console.log('res channels-->', resChannels);
        if (resChannels.data != undefined && resChannels.data.status == 200) {
          console.log('res on getgroups==>', resChannels.data);
          let channels = [];
          let UserChannels = resChannels.data.groups;
          UserChannels.forEach((g) => {
            g.status = 0;
            g.message = '';
            channels.push(g);
          });
          console.log('Channels-->', channels);
          this.props.dispatch({ type: "CHANNELS", channels: channels });
          // this.props.dispatch({
          //   type: userConstants.CHANNELS,
          //   channels: channels,
          // });
          setTimeout(() => {
            this.flatList && this.flatList.scrollToOffset({animated: true, offset: 0});
          }, 100);
          this.__SubscribeChannels(channels);
        }
      })
      .catch((err) => console.log('err on getgroups-->', err))
      .finally(() => {
        this.setState({loading: false});
      });
  }
  __SubscribeChannels=(channels)=> {     
    channels.forEach((g) => {
      let opt = { key: g.channel_key, channel: g.channel_name };
      this.Client.Subscribe(opt);
    });
  }
  

  __GetFriends() {
    this.setState({userLoading: true});
    User.getAllUsers(this.props.user.user.auth_token)
      .then((users) => {
        console.log('res on Allusers-->', users.data.users);

        if (users.data != undefined && users.data.status == 200) {
          this.setState({users: users.data.users});
          // this.props.dispatch({type: 'FRIENDLIST', users: resFriends.users});
        }
      })
      .catch((err) => console.log('err on AllUsers-->', err))
      .finally(() => {
        this.setState({userLoading: false});
      });
  }

  pressUser = (user) => {
    // console.log("on Press user-->",this.selectedUsersRef);
    let tempUser = this.state.selectedUsers;
    let indexOf = tempUser.findIndex((e) => e.username == user.username);
    if (indexOf > -1) {
      tempUser.splice(indexOf, 1);
      this.setState({selectedUsers: [...tempUser]});
      if (tempUser.length === 1) {
        this.setState({
          grouptitle: `${tempUser[0].username}-${this.props.user.user && this.props.user.user.username}`,
        });
      } else {
        this.setState({grouptitle: ''});
      }
    } else {
      let concatinated = tempUser.concat(user);
      if (concatinated.length === 1) {
        this.setState({
          grouptitle: `${concatinated[0].username}-${this.props.user.user && this.props.user.user.username}`,
        });
      } else {
        this.setState({grouptitle: ''});
      }
      this.setState({selectedUsers: [...concatinated]});
    }
  };

  createChat = () => {
    if (this.state.grouptitle.trim().length === 0) {
      // this.refs.toast.show('Enter Group Name First !', DURATION.LENGTH_LONG);
    } else {
      this.setState({createChatLoading: true});
      let tmp = [];
      this.state.selectedUsers.forEach((user) => {
        tmp.push(user.id);
      });
      console.log('participants->', tmp);
      let data = {
        group_title: this.state.grouptitle,
        pariticpants: tmp,
        auto_created: tmp.length == 1 ? 1 : 0,
      };
      User.createChat(data, this.props.user.user.auth_token)
        .then((res) => {
          if (res.data.status == 200) {
            this.__GetGroups();
            this.setState({
              searchText: '',
              userLoading: false,
              selectedUsers: [],
              grouptitle: '',
              addUserModal: false,
            });
          }
          console.log('res on create chat-->', res.data);
        })
        .catch((err) => {
          console.log('err on create chat-->', err);
        })
        .finally(() => {
          this.setState({createChatLoading: false});
        });
    }
  };
  __CurrentMessage=(group)=>{
    let k=group.channel_name;
    let currentMessageList=this.props.MessageCurrentList;
    let messageTypingList=this.props.MessageTypingList;
    let message=SingleValuefromObjectArray(currentMessageList,k);
    let sender=message.split(":")[0];
    if(sender && this.props.user.username==sender.trim())
    message=message.replace(sender, "You");
    let Typings=GetArrayFromObjOfArray(this.props.MessageTypingList,k);
    if(Typings.length > 0)
    message=`${Typings.join(",")} ${(Typings.length > 1)?'are':'is'} typing.`;
    return message;
  } 
  __ParticipantStatus=(group)=>{
    let  pStatus='';
    let pColor="red";
    let subsArr=GetArrayFromObjOfArray(this.props.SubscriberList,group.channel_name);
    if(group.auto_created=='1'){
      pStatus='Offline';
      pColor="red";
     if(CheckIndexOfArray(subsArr,group.participents[0].username)){
        pStatus='Online';
        pColor="green";
     }
    }
    if(group.auto_created=='0'){
     pStatus=`(${subsArr.length}/${group.participents.length})`;
     pColor="green";
    }

    return {status:pStatus,color:pColor};
  }

  render() {
    console.log("channels-->",this.props.channels);
    return (
      <Container
        barStyle={'light-content'}
        statusBarColor={Colors.Primary}
        style={{flex: 1}}>
        <AppHeader
          titleLeftAlign
          containerStyle={styles.header}
          body={
            <ResponsiveText style={styles.headertitle}>Inbox</ResponsiveText>
          }
          right={
            <Image source={require('../../../assets/icons/logout.png')} style={{height:wp(6.5),width:wp(6.5),resizeMode:'contain',tintColor:'white'}} />
           
          }
          rightPress={()=>{
            this.Client.Disconnect();
            this.props.dispatch({type:userConstants.LOGOUT})
              this.props.dispatch({type:userConstants.CLEAR_USER_DATA})
          }}
        />
        <View style={styles.clearFix} />
        <FlatList
          ref={(ref) => (this.flatList = ref)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: wp('5.5'),
            paddingTop: wp('4'),
            flexGrow: 1,
          }}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              {this.state.loading ? (
                <Spinner
                  isVisible={true}
                  size={35}
                  type={'Wave'}
                  color={Colors.Primary}
                />
              ) : (
                <ResponsiveText>No Chat Yet !</ResponsiveText>
              )}
            </View>
          )}
          data={this.props.channels}
          renderItem={({item, index}) => {
            // console.log("-->",item.grouptitle.split('-').find(e=>e!==this.props.user.user.username))
            return (
              <ChatCard
              currentMessage={this.__CurrentMessage(item)}
              pubsub={this.Client}
                item={item}
                key={index}
                profile_image={
                  item.auto_created == 0
                    ? require('../../../assets/icons/users.png')
                    : require('../../../assets/icons/user.png')
                }
                user_name={
                  this.props.user.user?
                  item.auto_created == 0
                    ? item.grouptitle
                    : item.grouptitle
                        .split('-')
                        .find((e) => e !== this.props.user.user && this.props.user.user.username):''
                }
  
    time={this.__ParticipantStatus(item).status}
    statusColor={this.__ParticipantStatus(item).color}
                unseen_messsages={item.unseen_messsages}
                last_message={item.message}
                navigation={this.props.navigation}
              />
            );
          }}
          keyExtractor={(item, index) => `${index}`}
        />
        <TouchableOpacity
          onPress={() => {
            this.setState({addUserModal: true});
            this.__GetFriends();
          }}
          style={styles.plusChatContainer}>
          <Image
            source={require('../../../assets/icons/plus.png')}
            style={styles.plusIcon}
          />
        </TouchableOpacity>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.addUserModal}
          onRequestClose={() => {
            this.setState({
              addUserModal: false,
              searchText: '',
              userLoading: false,
              selectedUsers: [],
              grouptitle: '',
            });
          }}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  addUserModal: false,
                  searchText: '',
                  userLoading: false,
                  selectedUsers: [],
                  grouptitle: '',
                });
              }}
              activeOpacity={1}
              style={styles.modalTop}>
              <Image
                source={require('../../../assets/icons/cross.png')}
                style={styles.crossIcon}
              />
            </TouchableOpacity>
            <View style={styles.ModalContent}>
              <View style={{marginBottom: 10}}>
                <InputField
                  value={this.state.searchText}
                  onChangeText={(e) => this.setState({searchText: e})}
                  placeholder={'Search user here ..'}
                  containerStyle={styles.searchInput}
                />
              </View>
              <FlatList
                keyExtractor={(item, index) => `${index}`}
                data={
                  this.state.searchText.trim().length === 0
                    ? this.state.users
                    : this.state.users.filter((e) =>
                        e.username
                          .toLowerCase()
                          .startsWith(
                            this.state.searchText.trim().toLowerCase(),
                          ),
                      )
                }
                ListEmptyComponent={() => (
                  <View style={styles.emptyContainer}>
                    {this.state.userLoading ? (
                      <Spinner
                        isVisible={true}
                        size={35}
                        type={'Wave'}
                        color={Colors.Primary}
                      />
                    ) : (
                      <ResponsiveText>No User Found!</ResponsiveText>
                    )}
                  </View>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}
                renderItem={({item, index}) => {
                  return (
                    <UserCard
                      onPress={(user) => this.pressUser(user)}
                      selected={
                        this.state.selectedUsers.findIndex(
                          (e) => e.username == item.username,
                        ) > -1
                      }
                      userName={item.username}
                      item={item}
                    />
                  );
                }}
              />
              {this.state.selectedUsers.length > 0 && (
                <View style={styles.createGroupFooter}>
                  <View style={styles.createGroupInput}>
                    <InputField
                      value={this.state.grouptitle}
                      placeholder={'Insert Group Name First...'}
                      // placeholderTextColor={'black'}
                      containerStyle={{
                        backgroundColor: 'rgba(78, 178, 200, 0.15)',
                        borderColor: Colors.Primary,
                        opacity: this.state.createChatLoading ? 0.3 : 1,
                      }}
                      onChangeText={(e) => this.setState({grouptitle: e})}
                    />
                  </View>
                  <View style={styles.createGroupTickContainer}>
                    <TouchableOpacity
                      disabled={
                        this.state.grouptitle.trim().length === 0 ||
                        this.state.createChatLoading
                      }
                      onPress={() => this.createChat()}
                      style={[
                        styles.createGroupTickWrapper,
                        {
                          opacity:
                            this.state.grouptitle.trim().length === 0 ? 0.4 : 1,
                        },
                      ]}>
                      {this.state.createChatLoading ? (
                        <Spinner
                          isVisible={true}
                          size={20}
                          type={'Wave'}
                          color={'white'}
                        />
                      ) : (
                        <Image
                          source={require('../../../assets/icons/tickSimple.png')}
                          style={styles.createtickIcon}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps, null)(Inbox);

const styles = {
  crossIcon: {
    height: wp(8),
    width: wp(8),
    resizeMode: 'contain',
    tintColor: 'white',
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  plusIcon: {
    height: '50%',
    width: '50%',
    resizeMode: 'contain',
    tintColor: 'white',
  },
  plusChatContainer: {
    height: wp('13'),
    width: wp('13'),
    borderRadius: wp('13'),
    backgroundColor: Colors.Primary,
    elevation: 3,
    position: 'absolute',
    bottom: wp('5'),
    right: wp('5'),
    alignItems: 'center',
    justifyContent: 'center',
    // opacity:0.8
  },

  emptyContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.65,
  },
  header: {
    backgroundColor: Colors.Primary,
  },
  leftIconContainer: {
    paddingVertical: 7,
    paddingRight: 5,
  },
  HeaderleftIcon: {
    height: wp('3.5'),
    width: wp('3.5'),
    resizeMode: 'contain',
    // backgroundColor: 'red'
  },
  headerNotificationIcon: {
    height: wp('7'),
    width: wp('7'),
    resizeMode: 'contain',
  },
  headertitle: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 5.3,
    color: 'white',
  },
  clearFix: {
    height: wp('0.4'),
    backgroundColor: '#E1E1E1',
    // marginBottom:wp('4')
  },
  notificationBadge: {
    height: wp('2.8'),
    width: wp('2.8'),
    backgroundColor: '#59EF0E',
    borderRadius: wp('2.8'),
    position: 'absolute',
    right: -4,
    top: -1.5,
    elevation: 1,
  },
  modalContainer: {
    height: '100%',
    width: '100%',
    // backgroundColor:'rgba(255,255,255,0.63)'
    backgroundColor: Colors.PrimaryLight,
    // backgroundColor:'rgba(0,0,0,0.3)'
  },
  modalTop: {
    // height:hp(10)
    height: '15%',
    width: '100%',
    // backgroundColor
  },
  ModalContent: {
    height: '85%',
    backgroundColor: 'white',
    borderTopLeftRadius: wp(7),
    borderTopRightRadius: wp(7),
    paddingHorizontal: wp(5),
    paddingVertical: wp(5),
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: Colors.Primary,
  },
  searchInput: {
    borderColor: Colors.Primary,
    backgroundColor: 'rgba(78, 178, 200, 0.15)',
  },
  createGroupFooter: {
    height: wp(15),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  createGroupInput: {
    width: '82%',
    height: '100%',
    justifyContent: 'center',
  },
  createGroupTickContainer: {
    width: '18%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createGroupTickWrapper: {
    height: wp(12),
    width: wp(12),
    borderRadius: wp(14),
    // backgroundColor: Colors.Primary,
    backgroundColor: '#00B575',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  createtickIcon: {
    height: '80%',
    width: '80%',
    resizeMode: 'contain',
    tintColor: 'white',
  },
};

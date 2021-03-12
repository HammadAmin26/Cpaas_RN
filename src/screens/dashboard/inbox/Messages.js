import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
// import * as DocumentPicker from "expo-document-picker";

import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import ResponsiveText from '../../../components/ResponsiveText';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen/index';
import * as PUBSUB from 'PubSub';

import Fonts from '../../../themes/Fonts';
import InputField from '../../../components/InputField';
import MessageBubble from '../../../components/MessageBubble';
import {Colors} from '../../../themes/Colors';
import {
  CheckIndexOfArray,
  GetArrayFromObjOfArray,
} from '../../../../Shared/Helpers/ArrayHelper';
// import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Picture',
  quality: 0.75,
  storageOptions: {
    skipBackup: true,
  },
};

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // chat: messages,
      text: '',
      payload: null,
      imageToOpen: '',
      output:{},
      
    };
  }
  __CurrentChatStatus = (group) => {
    let pStatus = '';
    let pColor = '#ff6666'; //red
    let subsArr = GetArrayFromObjOfArray(
      this.props.SubscriberList,
      group.channel_name,
    );
    if (group.auto_created == '1') {
      pStatus = 'Offline';
      pColor = '#ff6666';
      if (CheckIndexOfArray(subsArr, group.participents[0].username)) {
        pStatus = 'Online';
        pColor = '#99ff66';
      }
    }
    if (group.auto_created == '0') {
      pStatus = `Online(${subsArr.length}/${group.participents.length})`;
      pColor = '#99ff66';
    }

    return {status: pStatus, color: pColor};
  };

  //   pickPayload = () => {
  //     ImagePicker.showImagePicker(options, (response) => {
  //       //console.log('Response = ', response);

  //       if (response.didCancel) {
  //         console.log('User cancelled image picker');
  //       } else if (response.error) {
  //         console.log('ImagePicker Error: ', response.error);
  //       } else if (response.customButton) {
  //         console.log('User tapped custom button: ', response.customButton);
  //       } else {
  //         let ImgSource = {
  //           name:
  //             response.fileName !== null ? response.fileName : response.fileName,
  //           type: 'image/*',
  //           uri: response
  //             ? Platform.OS === 'android'
  //               ? response.uri
  //               : response.uri.replace('file://', '')
  //             : null,
  //         };
  //         if (!ImgSource.name) {
  //           ImgSource.name = 'img';
  //         }
  //         const source = {uri: response.uri};

  //         this.setState({payload: ImgSource});
  //       }
  //     });
  //   };

  sendMessage = () => {
    this.OnBlur();
    const {chat, text, payload} = this.state;
    const {
      profile_image,
      user_name,
      time,
      unseen_messsages,
      last_message,
      chatDetails,
      pubsub,
    } = this.props.route.params;

    let newMessage = {};
    if (payload) {
      let messageOBJ=  {
        // id: new Date().getTime(),
        topic: chatDetails.channel_name ,
        ////////////////////////////////// we need a var key for publishing a message “key/topic” JS Team 
        key : chatDetails.channel_name,
        ///////////////////////////////////////////////// 
        from:this.props.user.user && this.props.user.user.username,  
        type: 'image',
      };
      console.log("llpp==?",this.state.output,messageOBJ);
      // FileService.SendFile(this.Client, message, this.props);
      pubsub.SendFile(this.state.payload.uri,messageOBJ);
    } else {
      let messageOBJ = {
        id: new Date().getTime().toString(),
        to: chatDetails.channel_name,
        ////////////////////////////////// we need a var key for publishing a message “key/topic” JS Team
        key: chatDetails.channel_key,
        /////////////////////////////////////////////////
        from: this.props.user.user && this.props.user.user.username,
        type: 'text',
        content: text,
        size: 0,
        isGroupMsg: true,
      };
      pubsub.SendMessage(messageOBJ);
    }

    this.setState((prev) => ({
      // chat: prev.chat.concat(newMessage),
      text: '',
      payload: null,
    }));
    // setTimeout(() => {
    //   this.flatList.scrollToEnd({animated: true});
    // }, 200);
  };
  OnBlur = () => {
    const {chat, payload} = this.state;
    const {
      profile_image,
      user_name,
      time,
      unseen_messsages,
      last_message,
      chatDetails,
      pubsub,
    } = this.props.route.params;
    let msgObj = {
      type: 'typing',
      content: '0',
      size: 0,
      id: new Date().getTime().toString(),
      to: chatDetails.channel_name,
      ////////////////////////////////// we need a var key for publishing a message “key/topic” JS Team
      key: chatDetails.channel_key,
      /////////////////////////////////////////////////
      from:this.props.user.user && this.props.user.user.username,
      // type: 'text',
      // content: text,
      // size: 0,
      isGroupMsg: true,
    };
    pubsub.SendMessage(msgObj);
  };

  render() {
    const {chat, payload} = this.state;
    const {
      profile_image,
      user_name,
      time,
      unseen_messsages,
      last_message,
      chatDetails,
      pubsub,
    } = this.props.route.params;
    console.log('props-->', this.props);
    console.log(
      'messgae list-->',
      this.props.MessageList[this.props.MessageList.length - 1],
    );
    // const fileListt = new FileList();
    // console.log("type",typeof fileListt);
    // let currentMessages = GetArrayFromObjOfArray(
    //   this.props.MessageList,
    //   chatDetails.channel_name
    // );
    // console.log('current messages-->',currentMessages);
    return (
      <Container
        barStyle={'light-content'}
        statusBarColor={Colors.Primary}
        style={{flex: 1}}>
        <AppHeader
          // onlineStatus={this.__CurrentChatStatus(chatDetails).status}
          // onlineStatusColor={this.__CurrentChatStatus(chatDetails).color}
          titleLeftAlign
          containerStyle={styles.header}
          left={
            <View style={styles.leftIconContainer}>
              <Image
                source={require('../../../assets/icons/left_chevron2.png')}
                style={styles.HeaderleftIcon}
              />
            </View>
          }
          right={
            <ResponsiveText
              style={{
                color: this.__CurrentChatStatus(chatDetails).color,
                fontSize: 3,
              }}>
              {this.__CurrentChatStatus(chatDetails).status}
            </ResponsiveText>
            // <View style={styles.leftIconContainer}>
            //   <Image
            //     source={require('../../../assets/icons/video.png')}
            //     style={styles.headerRightIcon}
            //   />
            // </View>
          }
          leftPress={() => this.props.navigation.goBack()}
          body={
            <ResponsiveText style={styles.headertitle}>
              {user_name.length < 13
                ? user_name
                : `${user_name.substring(0, 13)}..`}
            </ResponsiveText>
          }
        />
        <View style={styles.clearFix} />
        <FlatList
          ref={(ref) => (this.flatList = ref)}
          data={GetArrayFromObjOfArray(
            this.props.MessageList,
            chatDetails.channel_name,
          )}
          onContentSizeChange={() => {
            this.flatList.scrollToEnd({animated: false});
          }}
          ListEmptyComponent={() => (
            <View
              style={{
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ResponsiveText style={{color: 'rgba(0,0,0,0.5)'}}>
                No Messages Yet !
              </ResponsiveText>
            </View>
          )}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => {
            return (
              <MessageBubble
                item={item}
                onPressImage={(image) => {
                  this.setState({imageToOpen: image});
                }}
                sent_by={item.from}
                profile_image={profile_image}
                type={item.type}
                content={item.content}
                // image_url={item.image_url}
                status={item.status}
                me={this.props.user.user && this.props.user.user.username}
              />
            );
          }}
        />
        {payload && (
          <View
            style={{
              backgroundColor: 'transparent',
              position: 'absolute',
              bottom: 80,
            }}>
            <View style={{height: 60, width: 60, marginLeft: 20}}>
              <Image
                source={{uri: this.state.payload.uri}}
                style={{height: 60, width: 60, borderRadius: 5}}
              />
              <TouchableOpacity
                onPress={() => this.setState({payload: null})}
                style={styles.imageCrossContainer}>
                <Image
                  source={require('../../../assets/icons/cross.png')}
                  style={styles.crossIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.sendInputContainer}>
          <InputField
            CameraPress={async () => {
              // let result = await DocumentPicker.getDocumentAsync({
              //   type: "*/*",
              //   multiple: true,
              // });
              // console.log("response onDocument picker ==>", result);
              // if(result.type== "success" && result.size<6000000){
              //   let data = {
              //     uri: result.uri,
              //     type: result.file.type,
              //   };
              //   // this.setState({ attachment: result });
              // }else{
              // //  this.props.dispatch({type:'FILE_ERROR',payload:true})
              //  //  Alert.alert('jdhjfdd')
              // }

              try {
                const res = await DocumentPicker.pick({
                  type: [DocumentPicker.types.images],
                  readContent: true,
                });
                
                console.log('res on picker-->', res);
                // RNFS.writeFile(res.uri).then((data) => {
                //   console.log("in RNFS-->",data);
                // })
                RNFetchBlob.fs
                  .readFile(res.uri, 'base64')
                  .then((data) => {

                    

                    console.log('data to base64->',`data:${res.type};base64,${data}`)
                   let baseUri=`data:${res.type};base64,${data}`
                    let ok ={
                      ext: res.type.split('/')[1],
                      filename: res.name,
                      from: this.props.user.user && this.props.user.user.username,
                      id: new Date().getTime().toString(),
                      // isBuffering: false,
                      isGroupMsg: false,
                      key: chatDetails.channel_key,
                      size: res.size,
                      to: chatDetails.channel_name,
                      type: "image",
                      uri:baseUri
                      }
                      

                    
                      let output={
                        0:{
                          name:res.name,
                          lastModified:new Date().getTime().toString(),
                          size:res.size,
                          type:res.type,
                          webkitRelativePath:''
                        },
                        size:res.size,
                        type:'success',
                        uri:baseUri
                      }
                      this.setState({payload:ok,output:output})
                  })
                  .catch((err) => {});
                console.log(
                  res.uri,
                  res.type, // mime type
                  res.name,
                  res.size,
                );
              } catch (err) {
                if (DocumentPicker.isCancel(err)) {
                  // User cancelled the picker, exit any dialogs or menus and move on
                } else {
                  throw err;
                }
              }
            }}
            CameraIcon={true}
            placeholder={'Write your message here ...'}
            onBlur={this.OnBlur}
            inputField={{fontSize: wp('3.3')}}
            containerStyle={styles.SendInput}
            value={this.state.text}
            right={
              <View style={styles.sendButton}>
                <Image
                  source={require('../../../assets/icons/send.png')}
                  style={styles.sendIcon}
                />
              </View>
            }
            // placeholderTextColor={'#B7B7B7'}
            rightPress={
              this.state.text.trim().length > 0 || this.state.payload
                ? this.sendMessage
                : null
            }
            rightStyle={{padding: 0, marginRight: -5}}
            onChangeText={(e) => {
              let msgObj = {
                type: 'typing',
                content: '1',
                size: 0,
                id: new Date().getTime().toString(),
                to: chatDetails.channel_name,
                ////////////////////////////////// we need a var key for publishing a message “key/topic” JS Team
                key: chatDetails.channel_key,
                /////////////////////////////////////////////////
                from: this.props.user.user && this.props.user.user.username,
                // type: 'text',
                // content: text,
                // size: 0,
                isGroupMsg: true,
              };
              pubsub.SendMessage(msgObj);
              // this.props.SendMessage(msgObj)
              this.setState({text: e});
            }}
          />
        </View>
        {this.state.imageToOpen ? (
          <View
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              position: 'absolute',
              zIndex: 10,
            }}>
            <Image
              source={{uri: this.state.imageToOpen}}
              style={{
                height: '100%',
                width: '100%',
                resizeMode: 'contain',
                zIndex: 11,
              }}
            />
            <TouchableOpacity
              onPress={() => this.setState({imageToOpen: ''})}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                height: wp(14),
                width: wp(14),
                borderRadius: wp(14),
                backgroundColor: Colors.Primary,
                zIndex: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../../assets/icons/cross.png')}
                style={{
                  height: '70%',
                  width: '70%',
                  resizeMode: 'contain',
                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps, null)(Messages);

const styles = {
  header: {
    backgroundColor: Colors.Primary,
  },
  leftIconContainer: {
    padding: 7,
  },
  HeaderleftIcon: {
    height: wp('3.5'),
    width: wp('3.5'),
    resizeMode: 'contain',
    tintColor: 'white',
    // backgroundColor: 'red'
  },
  headerRightIcon: {
    height: wp('6'),
    width: wp('6'),
    resizeMode: 'contain',
    tintColor: 'white',
  },
  headerNotificationIcon: {
    height: wp('8'),
    width: wp('8'),
    resizeMode: 'contain',
  },
  headertitle: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 5.5,
    color: 'white',
  },
  clearFix: {
    height: wp('0.4'),
    backgroundColor: '#E1E1E1',
    // marginBottom:wp('4')
  },
  sendInputContainer: {
    height: wp('20'),
    width: wp('100'),
    // position: 'absolute',
    bottom: 0,
    // backgroundColor: 'green',
    borderTopWidth: wp('0.3'),
    borderTopColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingRight:0
  },
  SendInput: {
    width: wp('91'),
    backgroundColor: '#F2F2F2',
    paddingLeft: wp('4'),
    borderWidth: 0,
    borderRadius: wp('10'),
    height: wp('13'),
    paddingRight: 2,

    // marginBottom: wp('6'),
  },
  sendButton: {
    height: wp('10'),
    width: wp('10'),
    borderRadius: wp('10'),
    backgroundColor: Colors.Primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    height: wp('5.5'),
    width: wp('5.5'),
    tintColor: 'white',
    resizeMode: 'contain',
  },
  contentContainer: {
    flexGrow: 1,
    // justifyContent: 'flex-end',
    paddingVertical: wp('2.2'),
  },
  imageCrossContainer: {
    backgroundColor: '#0089FF',
    position: 'absolute',
    height: 28,
    width: 28,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    right: -5,
    top: -5,
    borderWidth: 1,
    borderColor: 'white',
  },
  crossIcon: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
    tintColor: 'white',
  },
};

import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ImageBackground,Image} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ResponsiveText from './ResponsiveText';
import Fonts from '../themes/Fonts';
import { Colors } from '../themes/Colors';
import User from '../services/User';
// import { Colors } from 'react-native/Libraries/NewAppScreen';

class ChatCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      profile_image,
      user_name,
      time,
      unseen_messsages,
      last_message,
      item,
      currentMessage,
      pubsub,
      statusColor
    } = this.props;

    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('Messages', {
            profile_image,
            user_name,
            time,
            unseen_messsages,
            last_message,
            chatDetails:item,
            pubsub
          })
        }
        activeOpacity={0.8}
        style={styles.cardContainer}>
        <View style={styles.innerContainer}>
          <View>
            <View style={styles.imageContainer}>
              <ImageBackground
                // source={item.auto_created==0? require('../assets/icons/Group.png'):require('../assets/images/placeholder.png')}
                style={styles.placeholderImage}>
                <Image
                  source={profile_image}
                  style={styles.profileImage}
                />
              </ImageBackground>
            </View>
            {/* {unseen_messsages !== '0' && (
              <View style={styles.unseenBadge}>
                <ResponsiveText
                  style={{
                    fontSize: 3,
                    color: 'white',
                    fontFamily: Fonts.OpenSansRegular,
                  }}>
                  {unseen_messsages}
                </ResponsiveText>
              </View>
            )} */}
          </View>
          <View style={styles.nameContainer}>
            <ResponsiveText style={styles.name}>{user_name.length<13?user_name:`${user_name.substring(0,13)}..`}</ResponsiveText>
            <ResponsiveText style={styles.lastMessage}>
            {currentMessage!==""?currentMessage.length<26?currentMessage:`${currentMessage.substring(0,26)}...`:'No Message Yet'}
              {/* {last_message?last_message:'No Message Yet!'} */}
            </ResponsiveText>
          </View>
          <View style={styles.timeContainer}>
            <ResponsiveText style={{...styles.time,color:statusColor}}>{time}</ResponsiveText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ChatCard;
const styles = {
  cardContainer: {
    height: wp('21'),
    // backgroundColor:'red',
    borderBottomWidth: wp('0.3'),
    borderColor: '#E1E1E1',
    // borderColor:"#white",
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    height: wp('15'),
    flexDirection: 'row',
  },
  imageContainer: {
    height: wp('14'),
    width: wp('14'),
    borderRadius: wp('14'),
    overflow: 'hidden',
  },
  placeholderImage: {
    height: wp('14'),
    width: wp('14'),
    backgroundColor:Colors.PrimaryLight,
    alignItems:'center',
    justifyContent:'center'
  },
  profileImage: {
    height: wp('8'),
    width: wp('8'),
    borderRadius: wp('8'),
    tintColor:"white"
  },
  unseenBadge: {
    borderRadius: wp('10'),
    backgroundColor: '#0089FF',
    position: 'absolute',
    right: 0,
    paddingVertical: wp('0.5'),
    paddingHorizontal: wp('1.5'),
    elevation: 1,
  },
  nameContainer: {
    marginLeft: wp('3'),
    // flexGrow:1,
    width: wp('55'),
    height: wp('14'),
    maxHeight: wp('14'),
    overflow: 'hidden',
    marginTop: wp('1'),
  },
  name: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 4.4,
    // maxHeight: wp('4.5'),
    marginBottom: wp('0.5'),
    color: 'black',
  },
  lastMessage: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 3.2,
    maxHeight: wp('6'),
    color: '#3A3A3A',
    opacity: 0.6,
  },
  timeContainer: {
    flexGrow: 1,
  },
  time: {
    fontSize: 3.6,
    marginTop: wp('1'),
    color: '#3A3A3A',
    opacity: 0.5,
  },
};
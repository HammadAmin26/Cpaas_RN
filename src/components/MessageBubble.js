import React from 'react';
import {View, Text, Image,TouchableOpacity,Linking, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ResponsiveText from './ResponsiveText';
import Fonts from '../themes/Fonts';
import { Colors } from '../themes/Colors';
import Spinner from 'react-native-spinkit';
import Video from 'react-native-video';
import { WebView } from 'react-native-webview';
// import {WebView as WebBrowser} from 'react-native-webview'

var htmlCode = "<b>I am rendered in a <i>WebView</i></b>";
class MessageBubble extends React.Component {
   isValidURL=(string)=> {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };
  isValidImageUrl=(url)=> {
    return ["png","jpg","jpeg","gif","svg"].findIndex(v=>url.indexOf(v)>-1) > -1
  };
  __SetText=(text,sent_by,me)=>{
    let textArray=text.split(" ");
   let  textView=textArray.map((messageText,key)=>{
      if(this.isValidURL(messageText)){
        let messOpened= (messageText.indexOf("http") > -1)?messageText:`http://${messageText}`;
        if(this.isValidImageUrl(messageText)){
          
          return(
            <TouchableOpacity key={key} style={{flexDirection:"column",flexWrap:"wrap",width:'100%',alignSelf:'center'}} onPress={()=>{
              // WebBrowser.openBrowserAsync(messOpened);
              Linking.openURL(messOpened).catch((err) => console.error('An error occurred', err));
            }}>
              <Image style={{width:80,height:80,alignSelf:"center",resizeMode:"contain"}} source={{uri:messOpened}} />
              <Text style={[{color:"blue",flexWrap: 'wrap',width:"100%",alignSelf:'center',fontFamily: Fonts.OpenSansRegular,fontSize: wp(3.5),textDecorationLine:'underline'}]}>{messageText}</Text></TouchableOpacity>
          );
        }
        else{
          return (
            <TouchableOpacity key={key}  style={{maxWidth:'100%',flexWrap:'wrap'}} onPress={()=>{
              Linking.openURL(messOpened).catch((err) => console.error('An error occurred', err));

            }}><Text style={[{color:"blue",marginLeft:2,flexWrap: 'wrap',maxWidth:'100%',fontFamily: Fonts.OpenSansRegular,fontSize: wp(3.5),textDecorationLine:'underline'}]}>{messageText}</Text></TouchableOpacity>
          );
        }
       
      }
      else
      return <Text key={key}  style={[{marginLeft:2,flexWrap: 'wrap',maxWidth:'100%', 
      fontSize: wp(3.5),
      fontFamily: Fonts.OpenSansRegular,}]}>{messageText}</Text>;
  
  
    });
  return <View style={[{flexDirection:"row",flexWrap:"wrap",width:'100%'}]}>{textView}</View>
  
  //<Text style={ChatMessageStyles.messageText}>{message.content}</Text>
   } 
  render() {
    const {sent_by, profile_image, type, text, image_url,content,status,me,item} = this.props;
   console.log(item);
   console.log(this.props.MessageFileList[item.index],"single-->");
    return (
      <View style={styles.container}>
        {sent_by !== me && <ResponsiveText style={{fontSize:3.2,alignSelf: sent_by !== me ? 'flex-start' : 'flex-end',paddingLeft: wp('17'),marginVertical:wp(1),color:Colors.Primary,opacity:0.7}}>{sent_by}</ResponsiveText>}
        {type == 'text' && (
          <View
            style={{
              flexDirection: 'row',
              alignSelf: sent_by !== me ? 'flex-start' : 'flex-end',
              paddingHorizontal: wp('4'),
            }}>
            {sent_by !== me && (
              <View style={styles.headerprofileImageContainer}>
                <Image
                  source={require('../assets/icons/user.png')}
                  style={styles.headerProfileImage}
                />
              </View>
            )}
            <View
              style={{
                borderTopRightRadius: sent_by !== me ? wp('4') : 0,
                borderTopLeftRadius: sent_by !== me ? 0 : wp('4'),
                borderBottomLeftRadius: wp('4'),
                borderBottomRightRadius: wp('4'),
                overflow: 'hidden',
                flexWrap:'wrap',
                maxWidth:wp(63),
                backgroundColor: sent_by !== me ? '#F2F2F2' : Colors.PrimaryLight,
               padding:wp(3)
              }}>
              {/* <ResponsiveText
                style={{
                  backgroundColor: sent_by !== me ? '#F2F2F2' : Colors.PrimaryLight,
                  // alignSelf: sent_by !== 1 ? 'flex-start' : 'flex-end',
                  maxWidth: wp('63'),
                  padding: wp('3'),
                  fontSize: 3,
                  fontFamily: Fonts.OpenSansRegular,
                  flexWrap:'wrap'
                  // marginTop: wp('1'),
                }}> */}
                {this.__SetText(content,sent_by,me)}
              {/* </ResponsiveText> */}
            </View>
          </View>
        )}
        {type == 'video' && (
          <View
            style={{
              flexDirection: 'row',
              alignSelf: sent_by !== me ? 'flex-start' : 'flex-end',
              paddingHorizontal: wp('4'),
            }}>
            {sent_by !== me && (
              <View style={styles.headerprofileImageContainer}>
                <Image
                  source={require('../assets/icons/user.png')}
                  style={styles.headerProfileImage}
                />
              </View>
            )}
            <View
              style={{
                borderTopRightRadius: sent_by !== me ? wp('4') : 0,
                borderTopLeftRadius: sent_by !== me ? 0 : wp('4'),
                borderBottomLeftRadius: wp('4'),
                borderBottomRightRadius: wp('4'),
                overflow: 'hidden',
                flexWrap:'wrap',
                // maxWidth:wp(63),
                backgroundColor: sent_by !== me ? '#F2F2F2' : Colors.PrimaryLight,
               padding:wp(3)
              }}>
                <View style={{height:wp(50),width:wp(50),backgroundColor:'yellow'}}>
                {!item.isBuffering ?(
                  <View style={{height:wp(50),width:wp(50)}}>
                    {/* <Video
  // source={{ uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4' }}
  source={{ uri: this.props.MessageFileList[item.index] }}

  rate={1.0}
  onLoad={(res)=>{
    console.log('loaded==>',res);
  }}
  volume={1.0}
  isMuted={false}
  resizeMode="contain"
  // useNativeControls={true}
  // isLooping
  style={{ width: wp(50), height: wp(50)}}
/> */}
                  <WebView
                  scalesPageToFit={true}
                  bounces={false}
                  scrollEnabled={false}
                  style={{flexGrow:1 }}
                 source={{ html:
                  `<html>
                     <body>
                        <video style="width: 73%; height: 75% ;"
                        style={{ "object-fit": "cover" }}
                        autoPlay
                        controls>
                          <source type="video/mp4" src="${this.props.MessageFileList[item.index]}">
                       </video>
                    </body>
                  </html>` }}
       />
       </View>
                ):(
                  <Spinner
  isVisible={true}
  size={35}
  type={'Wave'}
  color={Colors.Primary}
/>
                )}
                </View>
{/* {!item.isBuffering ? <Video
  // source={{ uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4' }}
  source={{ uri: this.props.MessageFileList[item.index] }}

  rate={1.0}
  onLoad={(res)=>{
    console.log('loaded==>',res);
  }}
  volume={1.0}
  isMuted={false}
  resizeMode="contain"
  // useNativeControls={true}
  // isLooping
  style={{ width: wp(50), height: wp(50)}}
/>:(
  <Spinner
  isVisible={true}
  size={35}
  type={'Wave'}
  color={Colors.Primary}
/>

)} */}
              {/* <ResponsiveText
                style={{
                  backgroundColor: sent_by !== me ? '#F2F2F2' : Colors.PrimaryLight,
                  // alignSelf: sent_by !== 1 ? 'flex-start' : 'flex-end',
                  maxWidth: wp('63'),
                  padding: wp('3'),
                  fontSize: 3,
                  fontFamily: Fonts.OpenSansRegular,
                  flexWrap:'wrap'
                  // marginTop: wp('1'),
                }}> 

                       audio message
                
              </ResponsiveText> */}
            </View>
          </View>
        )}
        {type == 'audio' && (
          <View
            style={{
              flexDirection: 'row',
              alignSelf: sent_by !== me ? 'flex-start' : 'flex-end',
              paddingHorizontal: wp('4'),
            }}>
            {sent_by !== me && (
              <View style={styles.headerprofileImageContainer}>
                <Image
                  source={require('../assets/icons/user.png')}
                  style={styles.headerProfileImage}
                />
              </View>
            )}
            <View
              style={{
                borderTopRightRadius: sent_by !== me ? wp('4') : 0,
                borderTopLeftRadius: sent_by !== me ? 0 : wp('4'),
                borderBottomLeftRadius: wp('4'),
                borderBottomRightRadius: wp('4'),
                overflow: 'hidden',
                flexWrap:'wrap',
                maxWidth:wp(63),
                backgroundColor: sent_by !== me ? '#F2F2F2' : Colors.PrimaryLight,
               padding:wp(3)
              }}>
 {/* <Video
  source={{ uri: this.props.MessageFileList[item.index] }}
  rate={1.0}
  volume={1.0}
  isMuted={false}
  resizeMode="contain"
  // useNativeControls={true}
  // isLooping
  // style={{ width: wp(50), height: wp(10)}}
/> */}
              <ResponsiveText
                style={{
                  backgroundColor: sent_by !== me ? '#F2F2F2' : Colors.PrimaryLight,
                  // alignSelf: sent_by !== 1 ? 'flex-start' : 'flex-end',
                  maxWidth: wp('63'),
                  padding: wp('3'),
                  fontSize: 3,
                  fontFamily: Fonts.OpenSansRegular,
                  flexWrap:'wrap'
                  // marginTop: wp('1'),
                }}> 

                       audio message
                
              </ResponsiveText>
            </View>
          </View>
        )}
         {type == 'thumbnail' && (
          <View
            style={{
              flexDirection: 'row',
              alignSelf: sent_by !== me ? 'flex-start' : 'flex-end',
              paddingHorizontal: wp('4'),
            }}>
            {sent_by !== me && (
              <View style={styles.headerprofileImageContainer}>
                <Image
                  source={require('../assets/icons/user.png')}
                  style={styles.headerProfileImage}
                />
              </View>
            )}
            <View
              style={{
                borderTopRightRadius: sent_by !== me ? wp('4') : 0,
                borderTopLeftRadius: sent_by !== me ? 0 : wp('4'),
                borderBottomLeftRadius: wp('4'),
                borderBottomRightRadius: wp('4'),
                overflow: 'hidden',
              }}>
              <ResponsiveText
                style={{
                  backgroundColor: sent_by !== me ? '#F2F2F2' : Colors.PrimaryLight,
                  // alignSelf: sent_by !== 1 ? 'flex-start' : 'flex-end',
                  maxWidth: wp('63'),
                  padding: wp('3'),
                  fontSize: 3,
                  fontFamily: Fonts.OpenSansRegular,
                  color:'blue',
                  textDecorationLine: 'underline'
                  // marginTop: wp('1'),
                }}>
                {this.__SetText(content)}
              </ResponsiveText>
            </View>
          </View>
        )}
        {type == 'file' && (
          <View
            style={{
              flexDirection: 'row',
              alignSelf: sent_by !== me ? 'flex-start' : 'flex-end',
              paddingHorizontal: wp('4'),
            }}>
            {sent_by !== me && (
              <View style={styles.headerprofileImageContainer}>
                <Image
                  source={require('../assets/icons/user.png')}
                  style={styles.headerProfileImage}
                />
              </View>
            )}
            <View
              style={{
                backgroundColor: sent_by !== me ? '#EEEEEE' : Colors.PrimaryLight,
                // alignSelf: sent_by !== 1 ? 'flex-start' : 'flex-end',
                // maxWidth: wp('63'),
                
                padding: wp('1'),
                borderTopRightRadius: sent_by !== me ? wp('6') : 0,
                borderTopLeftRadius: sent_by !== me ? 0 : wp('6'),
                borderBottomLeftRadius: wp('6'),
                borderBottomRightRadius: wp('6'),
                fontSize: 3,
                fontFamily: Fonts.OpenSansRegular,
                marginTop: wp('1'),
                justifyContent: 'space-between',
                alignItems: sent_by !== me ? 'flex-start' : 'flex-end',
              }}>
                <TouchableOpacity onPress={()=>{
                let mess=  this.props.MessageFileList[item.index]
                  // Linking.openURL(mess).catch((err) => console.error('An error occurred', err));
                  // WebBrowser.openBrowserAsync(mess);
                }}>
              <Image source={require('../assets/icons/filee.png')} style={{height:wp(20),width:wp(20),resizeMode:'contain'}} />
              </TouchableOpacity>
              {/* {text.length > 0 && (
                <ResponsiveText style={styles.imageText}>{text}</ResponsiveText>
              )} */}
            </View>
          </View>
        )}
        {type == 'image' && (
          <View
            style={{
              flexDirection: 'row',
              alignSelf: sent_by !== me ? 'flex-start' : 'flex-end',
              paddingHorizontal: wp('4'),
            }}>
            {sent_by !== me && (
              <View style={styles.headerprofileImageContainer}>
                <Image
                  source={require('../assets/icons/user.png')}
                  style={styles.headerProfileImage}
                />
              </View>
            )}
            <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>{
              this.props.onPressImage(this.props.MessageFileList[item.index])
            }}
              style={{
                backgroundColor: sent_by !== me ? '#EEEEEE' : Colors.PrimaryLight,
                // alignSelf: sent_by !== 1 ? 'flex-start' : 'flex-end',
                maxWidth: wp('63'),
                padding: wp('4'),
                borderTopRightRadius: sent_by !== me ? wp('6') : 0,
                borderTopLeftRadius: sent_by !== me ? 0 : wp('6'),
                borderBottomLeftRadius: wp('6'),
                borderBottomRightRadius: wp('6'),
                fontSize: 3,
                fontFamily: Fonts.OpenSansRegular,
                marginTop: wp('1'),
                justifyContent: 'space-between',
                alignItems: sent_by !== me ? 'flex-start' : 'flex-end',
              }}>
              <Image source={{uri: this.props.MessageFileList[item.index]}} style={[styles.postImage,{zIndex:2}]} />
              <View style={{position:'absolute',alignSelf:"center",top:0,bottom:0,left:0,right:0,alignItems:'center',justifyContent:'center',opacity:0.4,zIndex:0}}>
              <Spinner
                  isVisible={true}
                  size={35}
                  type={'Wave'}
                  color={Colors.Primary}
                />
              </View>
              
              {/* {text.length > 0 && (
                <ResponsiveText style={styles.imageText}>{text}</ResponsiveText>
              )} */}
            </TouchableOpacity>
          </View>
        )}

      </View>
    );
  }
}
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps, null)(MessageBubble);

const styles = {
  container: {
    marginVertical: wp('2'),
    // flex: 1,
    // backgroundColor: 'red',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  textStyle: {},
  headerProfileImage: {
    height: wp('7'),
    width: wp('7'),
    borderRadius: wp('7'),
    backgroundColor: Colors.PrimaryLight,
    tintColor:'white'

    // resizeMode:'contain'
    // padding:wp('5')
  },
  headerprofileImageContainer: {
    height: wp('10'),
    width: wp('10'),
    borderRadius: wp('10'),
    borderWidth: wp('0.6'),
    borderColor: Colors.Primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3'),
    // backgroundColor:Colors.Primary
  },
  postImage: {
    height: wp('38'),
    width: wp('35'),
    // resizeMode: 'contain',
  },
  imageText: {
    marginTop: wp('3'),
    fontSize: 3,
    fontFamily: Fonts.OpenSansRegular,
  },
  // bubble:
};
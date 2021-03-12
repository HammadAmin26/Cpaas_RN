import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Container from '../../components/Container';
import Toast, {DURATION} from 'react-native-easy-toast';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ResponsiveText from '../../components/ResponsiveText';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Fonts from '../../themes/Fonts';
import bg from '../../assets/images/mountain.png';

import { Colors } from '../../themes/Colors';
import User from '../../services/User';
const height = Dimensions.get('window').height;
const toastStyle={
  backgroundColor: Colors.Primary,
  width: 300,
  height: Platform.OS === ("ios") ? 50 : 100,
  color: "#ffffff",
  fontSize: 15,
  lineHeight: 2,
  lines: 4,
  borderRadius: 15,
  fontWeight: "bold",
  yOffset: 40
};
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false,
      userName:'',
      password:'',
      nameError:'',
      passwordError:'',
      loading:false,
      otherError:''
    };
  }
  Signup=()=>{
    const{userName,password}=this.state
if(userName.trim().length===0){
  this.setState({nameError:'Enter Username'})
}else if(userName.trim().length<4){
  this.setState({nameError:"Username must contain 4 characters"})
}else if(password.trim().length===0){
  this.setState({passwordError:'Enter Password'})
}else if(password.trim().length<8){
  this.setState({passwordError:'Password must contain atleast 8 characters'})
}else{
this.setState({loading:true,passwordError:'',nameError:'',otherError:''})
let user = {
  username: this.state.userName,
  password: this.state.password,
  device_type: Platform.OS,
  device_model: "",
  device_os_ver: "",
  app_version: "",
};
User.Signup(user)
.then(res=>{console.log('res on signup-->',res.data)
if (res.data != undefined && res.data.status == 200) {
  this.refs.toast.show('Registered Succesfully! Please Login.', DURATION.LENGTH_LONG);
  setTimeout(() => {
    this.props.navigation.navigate('Login', { user: user })
  }, 1000);
  // ToastAndroid.show("some error msg", ToastAndroid.LONG);
  // Toast.show('Registered Succesfully! Please Login.', Toast.LONG, Toast.TOP,style);
}
else{
  this.setState({otherError:res.data.message})
}
})
.catch(err=>console.log('err on signup-->',err))
.finally(()=>{
  this.setState({loading:false})
})

}

  }
  render() {
    const{nameError,passwordError,otherError}=this.state
    return (
      <Container lottie backgroundImage={bg} backgroundImageStyle={styles.containerBack} style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.topContainer}>
            <Image
              source={require('../../assets/images/full_Logo.png')}
              style={styles.logo}
            />
            <ResponsiveText style={styles.loginText}>Sign Up</ResponsiveText>
            <InputField
            //   autoFocus
              placeholder={'Username'}
              value={this.state.userName}
              containerStyle={[styles.usernameInpt,{backgroundColor:nameError?'rgba(255, 0, 0,0.15)':'white'}]}
              keyboardType={'email-address'}
              onChangeText={e=>this.setState({userName:e,nameError:''})}
            />
            <ResponsiveText style={styles.errorText}>{nameError}</ResponsiveText>
            <InputField
              placeholder={'Password'}
              containerStyle={[styles.passwordInput,{backgroundColor:passwordError?'rgba(255, 0, 0,0.15)':'white'}]}
              onChangeText={e=>this.setState({password:e,passwordError:''})}
              value={this.state.password}
              secureTextEntry={this.state.isPasswordVisible ? false : true}
              right={
                <Image
                  source={require('../../assets/icons/eye.png')}
                  style={[
                    styles.eye,
                    {
                      tintColor: this.state.isPasswordVisible
                        ? Colors.Primary
                        : 'grey',
                    },
                  ]}
                />
              }
              rightPress={() =>
                this.setState((prev) => ({
                  isPasswordVisible: !prev.isPasswordVisible,
                }))
              }
            />
            <ResponsiveText style={styles.errorText}>{passwordError}</ResponsiveText>
    
            <Button
            loading={this.state.loading}
              text={'Signup'}
              containerStyle={styles.Loginbutton}
              textStyle={styles.LoginbuttonText}
              onPress={() => this.Signup()
                //  this.props.navigation.navigate('GetReady')
                }
            />
            <ResponsiveText style={styles.errorText}>{otherError}</ResponsiveText>
          </View>
          <TouchableOpacity
          disabled={this.state.loading}
            onPress={() =>
                 this.props.navigation.navigate('Login')
                }
            style={{
              flexDirection: 'row',
              paddingBottom: wp('5'),
            }}>
            <Text
              style={{
                textDecorationLine: 'underline',
                fontFamily: Fonts.RobotoRegular,
                color: '#7E7E7E',

              }}>
              Already have an account?{' '}
            </Text>
            <Text
              style={{
                color: Colors.Primary,
                textDecorationLine: 'underline',
                fontFamily: Fonts.RobotoRegular,
              }}>
              Log In
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <Toast
          ref="toast"
          style={{
            backgroundColor: Colors.Primary,
            width: '100%',
            borderRadius: 0,
            height: 50,
            justifyContent: 'center',
            alignItems:'center'
          }}
          position="top"
          positionValue={0}
          fadeInDuration={0}
          fadeOutDuration={2000}
          opacity={0.9}
          textStyle={{color: 'white', fontFamily: Fonts.RobotoMedium}}
        />
      </Container>
    );
  }
}

export default Signup;

const styles = {
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerBack:{
    width: wp('100%'),
    height: 300,
    top: undefined,
    tintColor:Colors.Primary,
    opacity:0.2

  },
  errorText:{
fontSize:3.2,
color:'red',
marginVertical:wp(1.2)
  },
  logo: {
    height: wp('30'),
    width: wp('30'),
    resizeMode: 'contain',
    marginBottom: wp('7'),
  },
  topContainer: {
    alignItems: 'center',
    paddingTop: wp('15'),
  },
  loginText: {
    fontSize: 6.5,
    // fontWeight: 'bold',
    marginBottom: wp('5'),
    fontFamily: Fonts.RobotoMedium
  },
  usernameInpt: {
    width: wp('80'),
    borderColor: Colors.Primary,
    paddingHorizontal: wp('4'),
    // marginBottom: wp('6'),
  },
  passwordInput: {
    width: wp('80'),
    borderColor: Colors.Primary,
    paddingHorizontal: wp('4'),
    // marginBottom: wp('6'),
  },
  eye: {
    height: wp('5.5'),
    width: wp('5.5'),
    padding: wp('2'),
  },
  forgotContainer: {alignSelf: 'flex-end', marginBottom: wp('7')},
  forgotText: {
    textDecorationLine: 'underline',
    color: '#7E7E7E',
    fontFamily: Fonts.RobotoRegular,
  },

  Loginbutton: {
    width: wp('80'),
    height: wp('15'),
    // backgroundColor: '#0089FF',
    marginBottom: wp('3.5'),
    elevation: 0,
    marginTop:wp('10')

  },
  LoginbuttonText: {
    fontSize: 5,
    // fontFamily: Fonts.SourceSansProSemiBold,
  },
};
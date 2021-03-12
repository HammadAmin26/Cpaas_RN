import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import AppHeader from '../../../components/AppHeader';
import Container from '../../../components/Container';
import ResponsiveText from '../../../components/ResponsiveText';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen/index';
import Fonts from '../../../themes/Fonts';
import {Colors} from '../../../themes/Colors';
import Button from '../../../components/Button';
import { userConstants } from '../../../../Shared/Constants/States/user';

class Profile extends Component {
  render() {
    return (
      <Container barStyle={'light-content'}  statusBarColor={Colors.Primary}  lottie >
        <AppHeader
          containerStyle={styles.header}
          body={
            <ResponsiveText style={styles.headertitle}>Profile</ResponsiveText>
          }
        />
        <View style={styles.clearFix} />
        <View style={styles.content}>
          <ResponsiveText style={styles.welcome}>
            Welcome{' '}
            <ResponsiveText style={styles.name}>
              {this.props.user.user && this.props.user.user.username}
            </ResponsiveText>
          </ResponsiveText>
          <Image
            source={require('../../../assets/images/full_Logo.png')}
            style={styles.logo}
          />

          <Button
            text={'Logout'}
            containerStyle={styles.logoutButton,{opacity:0}}
            disabled={true}
            leftIcon={
              <Image
                source={require('../../../assets/icons/logout.png')}
                style={styles.logoutIcon}
              />
            }
            onPress={()=>{
              this.props.dispatch({type:userConstants.LOGOUT})
              this.props.dispatch({type:userConstants.CLEAR_USER_DATA})
            }}
          />
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps, null)(Profile);

const styles = {
  logoutIcon: {
    height: wp(6),
    width: wp(6),
    resizeMode: 'contain',
    marginRight: 5,
    tintColor: 'white',
  },
  logoutButton: {opacity:0.9},
  logo: {
    height: wp(50),
    width: wp(50),
    resizeMode: 'contain',
  },
  name: {
    color: Colors.Primary,
    fontSize: 5.5,
    fontFamily: Fonts.RobotoBold,
  },
  welcome: {
    fontSize: 5,
    textAlign: 'center',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(7),
    paddingVertical:wp(15)
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  text: {
    color: 'white',
  },
  header: {
    backgroundColor:Colors.Primary

  },
  headertitle: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 5.3,
    color:'white'
  },
  clearFix: {
    height: wp('0.4'),
    backgroundColor: '#E1E1E1',
    // marginBottom:wp('4')
  },
};

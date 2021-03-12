import React, {Component} from 'react';
import { Image,Text } from "react-native";
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import GetStarted from '../screens/authentication/GettingStarted';
import Login from '../screens/authentication/Login';
import Signup from '../screens/authentication/Signup';
import Walkthrough from '../screens/authentication/Walkthrough';
import Home from '../screens/dashboard/Home';
import Inbox from '../screens/dashboard/inbox/Inbox';
import Profile from '../screens/dashboard/profile/Profile';
import Messages from '../screens/dashboard/inbox/Messages';
import Fonts from '../themes/Fonts';
import { Colors } from '../themes/Colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

class Navigation extends Component {
  DashboardTab = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            
            if (route.name == 'Inbox') {
              return (
                <>
                  <Image
                    source={require('../assets/icons/Inbox_tab.png')}
                    style={[styles.tabBarIcon, {tintColor: color}]}
                  />
                  <Text
                    style={{
                      color: color,
                      fontSize: wp('3'),
                      fontFamily: Fonts.RobotoBold,
                    }}>
                    Inbox
                  </Text>
                </>
              );
            }
            if (route.name == 'Profile') {
              return (
                <>
                  <Image
                    source={require('../assets/icons/profile_tab.png')}
                    style={[styles.tabBarIcon, {tintColor: color}]}
                  />
                  <Text
                    style={{
                      color: color,
                      fontSize: wp('3'),
                      fontFamily: Fonts.RobotoBold,
                    }}>
                    Profile
                  </Text>
                </>
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: Colors.Primary,
          inactiveTintColor: '#CECECE',
          style: {
            height: wp('15'),
            // borderTopWidth: 0,
            // elevation: 0,
          },
        }}>
        <Tab.Screen name="Inbox" options={{title: ''}} component={Inbox} />
        <Tab.Screen name="Profile" options={{title: ''}} component={Profile} />
      </Tab.Navigator>
    );
  };
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          headerMode={'none'}>
          {!this.props.user.user ? (
            <>
              <Stack.Screen name="GetStarted" component={GetStarted} />
              <Stack.Screen name="Walkthrough" component={Walkthrough} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          ) : (
            <>
              <Stack.Screen name="Dashboard" component={this.DashboardTab} />
              <Stack.Screen name="Messages" component={Messages} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps, null)(Navigation);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  text: {
    color: 'white',
  },
  tabBarIcon: {
    height: wp('6.5'),
    width: wp('6.5'),
    resizeMode: 'contain',
    marginTop: wp('3'),
  },
};

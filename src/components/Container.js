import React from 'react';
import {SafeAreaView, Image, Dimensions, StatusBar, View} from 'react-native';
import { Colors } from '../themes/Colors';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';


const Container = (props) => {
  const {
    statusBarColor,
    backgroundImageStyle,
    barStyle,
    backgroundImage,
    overlay,
    overlayColor,
    style,
    lottie
  } = props;

  let statusBarStyle = barStyle ? barStyle : 'dark-content';

  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar
        backgroundColor={statusBarColor || 'rgba(78, 178, 200, 0.5)'}
        barStyle={statusBarStyle}
        translucent={false}
      />
      {backgroundImage && (
        <Image
          source={backgroundImage}
          style={[styles.backgroundImage, backgroundImageStyle]}
        />
      )}
      {lottie &&  <View style={styles.lottieStyle}>

       <LottieView
          source={require('../assets/json/Lottie.json')}
          autoPlay
          loop
        />
        </View>}
      {overlay && (
        <View
          style={[
            styles.overlayStyle,
            {backgroundColor: overlayColor || 'black'},
          ]}
        />
      )}
      {props.children}
    </SafeAreaView>
  );
};

export default Container;

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  backgroundImage: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    tintColor:'red',
    resizeMode:'cover',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayStyle: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
  },
  lottieStyle: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 0,
    opacity:0.2
  },
};

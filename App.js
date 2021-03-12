import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux';
import Navigation from './src/navigation';
import { View } from 'react-native';
import { Colors } from './src/themes/Colors';
// import { Colors } from 'react-native/Libraries/NewAppScreen';

class App extends Component {
  render() {
    return (
     <>
     {/* <View style={{height:50,width:'100%',backgroundColor:Colors.Primary}}>

     </View> */}
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
      
      </>
      
    );
  }
}

export default App;

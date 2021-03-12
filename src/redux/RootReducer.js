import {combineReducers} from 'redux';
import User from './user/Reducer';
import UserData from './userData/Reducer';
import {user,profile,channels,current_chat,
  current_messages,pubsub,subscribers,
  current_channel,active_channel,navigation_custom,
  friendList
} from '../../Store/User/index';

import {SCREENS,current_screen} from '../../Store/Screen/index';
////////////////subscriber
import {SubscriberList} from '../../Store/User/Subscribers';
import {MessageList,MessageTypingList,MessageCurrentList,MessageFileList} from "../../Store/User/Messages";

// import championReducer from './champion/reducer';

const RootReducer = combineReducers({
  user:User,
  userData:UserData,
  profile,
  channels,
  current_chat,
  current_messages,
 // pubsub,
 subscribers,
  SCREENS,
  current_screen,
  current_channel,
  active_channel,
  navigation_custom,
  friendList,
  //////////////////subscribers
  SubscriberList,
  /////////////////message-list
  MessageTypingList,
  MessageList,
  MessageCurrentList,
  MessageFileList
  // champion: championReducer,
});

export default RootReducer;

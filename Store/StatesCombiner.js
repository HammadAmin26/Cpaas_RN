import { combineReducers } from 'redux';
import {user,profile,channels,current_chat,
   current_messages,pubsub,subscribers,
   current_channel,active_channel,navigation_custom,
   friendList
} from './User/index';

import {SCREENS,current_screen} from './Screen/index';
////////////////subscriber
import {SubscriberList} from './User/Subscribers';
import {MessageList,MessageTypingList,MessageCurrentList,MessageFileList} from "./User/Messages";
const StatesCombiner = combineReducers({
   user,
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
  });
  
  export default StatesCombiner;
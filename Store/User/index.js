import {userConstants} from '../../Shared/Constants/States/user';
const user=(state = {}, action)=>{
  switch (action.type) {
    case userConstants.USER:
      return action.user;
    default:
      return state
  }
};
const profile=(state = {}, action)=>{
  switch (action.type) {
    case userConstants.PROFILE:
      return action.client;
    default:
      return state
  }
};
const channels=(state = [], action)=>{
  switch (action.type) {
    case userConstants.CHANNELS:
      return action.channels;
    default:
      return state
  }
};
const current_chat=(state = {}, action)=>{
  switch (action.type) {
    case userConstants.CURRENT_CHAT:
      return action.channel;
    default:
      return state
  }
};
const current_messages=(state = {}, action)=>{
  switch (action.type) {
    case userConstants.CURRENT_MESSAGES:
      return action.messages;
    default:
      return state
  }
};
const pubsub=(state = {}, action)=>{
  switch (action.type) {
    case userConstants.PUBSUB:
      return action.pubsub;
    default:
      return state
  }
};
const subscribers=(state = [], action)=>{
  switch (action.type) {
    case userConstants.SUBSCRIBERS:
      return action.subscribers;
    default:
      return state
  }
};
const current_channel=(state ='', action)=>{
  switch (action.type) {
    case userConstants.CURRENT_CHANNEL:
      return action.channel;
    default:
      return state
  }
};  
const active_channel=(state ={}, action)=>{
  switch (action.type) {
    case userConstants.ACTIVE_CHANNEL:
      return action.channel;
    default:
      return state
  }
}; 
const navigation_custom=(state ={}, action)=>{
  switch (action.type) {
    case userConstants.CUSTOM_NAVIGATION:
      return action.navigation;
    default:
      return state
  }
}; 
const friendList=(state =[], action)=>{
  switch (action.type) {
    case userConstants.FRIENDLIST:
      return action.users;
    default:
      return state
  }
};
export {user,profile,channels,current_chat,current_messages,pubsub,subscribers,current_channel,active_channel,navigation_custom,friendList};

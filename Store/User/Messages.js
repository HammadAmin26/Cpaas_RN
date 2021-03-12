import {messageConstants} from '../../Shared/Constants/States/messages';
const MessageList=(state = [], action)=>{
  switch (action.type) {
    case messageConstants.MESSAGE_LIST:
      return action.messages;
    default:
      return state
  }
};
const MessageTypingList=(state = [], action)=>{
    switch (action.type) {
      case messageConstants.MESSAGE_TYPING_LIST:
        return action.messages;
      default:
        return state
    }
  };
  const MessageFileList=(state = [], action)=>{
    switch (action.type) {
      case messageConstants.MESSAGE_FILE_LIST:
        return action.messages;
      default:
        return state
    }
  }; 
  const MessageCurrentList=(state = [], action)=>{
    switch (action.type) {
      case messageConstants.MESSAGE_CURRENT_LIST:
        return action.messages;
      default:
        return state
    }
  };  

export {MessageList,MessageTypingList,MessageCurrentList,MessageFileList};

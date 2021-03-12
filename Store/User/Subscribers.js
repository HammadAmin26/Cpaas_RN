import {subcriberConstants} from '../../Shared/Constants/States/subscribers';
const SubscriberList=(state = [], action)=>{
  switch (action.type) {
    case subcriberConstants.SUBSCRIBERS_LIST:
      return action.subscribers;
    default:
      return state
  }
};

export {SubscriberList};

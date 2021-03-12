//import * as PUBSUB from 'PubSub';
//import {store} from '../../Store/';
import ApiService from '../Services/Api';
import {FindArrayObject,FindIndexOfObject,FindIndexOfArray,FindArrayValue,
    MakeArrayOfObjectKey,
    MakeObjectWithArray,
    AddSingleValueInArryByKey,
    RemoveSingleValueInArryByKey
} from "../Helpers/ArrayHelper";
import { subcriberConstants } from "../Constants/States/subscribers";
class Subscribers{
client;
constructor(){}
SetSubscribers(storeStates,subscriberData){
   // let storeStates=store.getState();
   if(subscriberData.who!=undefined){
    let subscribers=MakeObjectWithArray(storeStates.SubscriberList,subscriberData.channel,MakeArrayOfObjectKey(subscriberData.who,"username"));
    storeStates.dispatch({type:subcriberConstants.SUBSCRIBERS_LIST,subscribers:subscribers})
   }

}
SetOnline(storeStates,onlineData){
    
   // let storeStates=store.getState();
    console.log("onlineData 1::",onlineData,storeStates.SubscriberList);
    if(onlineData.who!=undefined){
        let subscribers=AddSingleValueInArryByKey(storeStates.SubscriberList,onlineData.channel,onlineData.who.username);
        storeStates.dispatch({type:subcriberConstants.SUBSCRIBERS_LIST,subscribers:subscribers})
    }

}
SetOffline(storeStates,offlineData){
  //  let storeStates=store.getState();
    console.log("onlineData 0::",offlineData,storeStates.SubscriberList);
    if(offlineData.who!=undefined){
    let subscribers=RemoveSingleValueInArryByKey(storeStates.SubscriberList,offlineData.channel,offlineData.who.username);
    storeStates.dispatch({type:subcriberConstants.SUBSCRIBERS_LIST,subscribers:subscribers});
    }
    
}


}
const SubscriberServie=new Subscribers();
export  default SubscriberServie;
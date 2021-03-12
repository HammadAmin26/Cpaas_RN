import * as PUBSUB from 'PubSub';
import {store} from '../../Store/';
import ApiService from '../Services/Api';
class PubSubService{
client;
constructor(){}
Connect(id){
    let client=new PUBSUB.Client({
        host:"ws://emit1.togee.io",
        port:"8080",
        credentials:{userName:id,password:""},
        reConnectivity:true,
        secret:"cWV91camkwd99XO9rvHmamvXxGdyeHK5"
    });
    this.Client=client;
    this.__SetEvents(client);
    return client;
}
__SetEvents(client){
this.Client.on("connect",(res)=>{
store.dispatch({type:"PUBSUB",pubsub:client});
});
this.Client.on("disconnect",(res)=>{

});
this.Client.on("subscribed",(res)=>{
console.log("ClientSubsCribed",res);
});
this.Client.on("unsubscribed",(res)=>{

});
this.Client.on("messagesent",(res)=>{

});
this.Client.on("online",(res)=>{

});
this.Client.on("offline",(res)=>{

});
this.Client.on("message",(res)=>{

});

}




}
const PubSub=new PubSubService();
export  default PubSub;
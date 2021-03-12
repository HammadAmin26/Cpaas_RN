import MessageSchema from "./MessageSchema";
import MessageTypeSchema from "./MessageTypeSchema";
import MessageCurrentSchema from "./MessageCurrentSchema";
import {isValidURL,isValidImageUrl} from '../Helpers/Formatter'; 
export default class MessageModel{
    message;
    constructor(){
        this.message=MessageSchema;
    }
    set from(val){
       this.message.from=val
    }
    get from(){
       return this.message.from;
     }
    set content(val){
        this.message.content=val
     }
     get content(){
        return this.message.content;
      }
    set id(val){
        this.message.id=val
     }
     get id(){
        return this.message.id;
      }
    set size(val){
        this.message.size=val
     }
     get size(){
        return this.message.size;
      } 
    set key(val){
        this.message.key=val
     }
     get key(){
        return this.message.key;
      } 
    set type(val){
        this.message.type=val
     }
     get type(){
        return this.message.type;
      } 
    set to(val){
        this.message.to=val
     }
     get to(){
        return this.message.to;
      } 
    set isGroupMsg(val){
        this.message.isGroupMsg=val
     }
     get isGroupMsg(){ 
        return this.message.isGroupMsg;
      }
    Send(client){
      client.SendMessage(this.message);  
    } 
    MapMessage(message){
     let messageProtocol=Object.keys(this.message);
     let receivedMessageKeys=Object.keys(message);
     let maper=messageProtocol.filter(k=>{
      return receivedMessageKeys.indexOf(k) > -1
      });
     return maper.length==messageProtocol.length;
    }
    MapCurrentMessage(message){
      if(message.type==MessageTypeSchema.Text){
        let messText= message.content;
        if(isValidURL(messText)){
          messText=MessageCurrentSchema[MessageTypeSchema.Path];
          if(isValidImageUrl){
            messText=MessageCurrentSchema[MessageTypeSchema.Thumbnail];
          }
        }
        return `${message.from}: ${messText}`;
      }
      
      return `${message.from}: ${MessageCurrentSchema[message.type]}`;
    }        

    
}
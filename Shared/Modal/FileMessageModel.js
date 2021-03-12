import FileMessageSchema from "./FileMessageSchema";
export default class FileMessageModel{
    message;
    constructor(){
        this.message=FileMessageSchema;
    }
    set messageId(val){
        this.message.messageId=val
     }
     get messageId(){
        return this.message.messageId;
      } 
      set content(val){
        this.message.content=val
     }
     get content(){
        return this.message.content;
      } 
      set packetNo(val){
        this.message.packetNo=val
     }
     get packetNo(){
        return this.message.packetNo;
      }   
      set from(val){
        this.message.from=val
     }
     get from(){
        return this.message.from;
      }
      set headerId(val){
        this.message.headerId=val
     }
     get headerId(){
        return this.message.headerId;
      }
      set topic(val){
        this.message.topic=val
     }
     get topic(){
        return this.message.topic;
      }  
      set key(val){
        this.message.key=val
     }
     get key(){
        return this.message.key;
      }      
    Send(client){
      client.SendFile(this.message);  
    } 
    MapReceipt(message){
      let messageProtocol=Object.keys(this.message);
      let receivedMessageKeys=Object.keys(message);
      let maper=messageProtocol.filter(k=>{
       return receivedMessageKeys.indexOf(k) > -1
       });
      // console.log("MapReceipt==::::==",messageProtocol,receivedMessageKeys,maper,maper.length==messageProtocol.length);
      return maper.length==messageProtocol.length;
     }         

    
}
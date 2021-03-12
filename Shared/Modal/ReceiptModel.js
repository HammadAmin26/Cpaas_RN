import ReceiptSchema from "./ReceiptSchema";
export default class ReceiptModel{
    message;
    constructor(){
        this.message=ReceiptSchema;
    }
    set messageId(val){
        this.message.messageId=val
     }
     get messageId(){
        return this.message.messageId;
      }
      set from(val){
        this.message.from=val
     }
     get from(){
        return this.message.from;
      }  
    set key(val){
        this.message.key=val
     }
     get key(){
        return this.message.key;
      } 
    set topic(val){
        this.message.topic=val
     }
     get topic(){
        return this.message.topic;
      } 
    set receiptType(val){
        this.message.receiptType=val
     }
     get receiptType(){
        return this.message.receiptType;
      }
    set date(val){
        this.message.date=val
     }
     get date(){
        return this.message.date;
      }
    Send(client){
      client.SendReceipt(this.message);  
    } 
    MapReceipt(message){
      let messageProtocol=Object.keys(this.message);
      let receivedMessageKeys=Object.keys(message);
      let maper=messageProtocol.filter(k=>{
       return receivedMessageKeys.indexOf(k) > -1
       });
       console.log("MapReceipt==::::==",messageProtocol,receivedMessageKeys,maper,maper.length==messageProtocol.length);
      return maper.length==messageProtocol.length;
     }         

    
}
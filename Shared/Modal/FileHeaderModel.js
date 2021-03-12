import FileHeaderSchema from "./FileHeaderSchema";
export default class FileHeaderModel{
    message;
    constructor(){
        this.message=FileHeaderSchema;
    }
    set from(val){
        this.message.from=val
     }
     get from(){
        return this.message.from;
      } 
      set fileExtension(val){
        this.message.fileExtension=val
     }
     get fileExtension(){
        return this.message.fileExtension;
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
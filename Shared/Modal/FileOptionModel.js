import FileOptionSchema from "./FileOptionSchema";
export default class FileOptionModel{
    message;
    constructor(){
        this.message=FileOptionSchema;
    }
    set from(val){
        this.message.from=val
     }
     get from(){
        return this.message.from;
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
      set type(val){
        this.message.type=val
     }
    get type(){
        return this.message.type;
      }  


    Send(client,file){
      console.log("before sending file==>",file,this.message)
      client.SendFile(file,this.message);  
    } 
    MapReceipt(message){
      let messageProtocol=Object.keys(this.message);
      let receivedMessageKeys=Object.keys(message);
      let maper=messageProtocol.filter(k=>{
       return receivedMessageKeys.indexOf(k) > -1
       });
      return maper.length==messageProtocol.length;
     }         

    
}
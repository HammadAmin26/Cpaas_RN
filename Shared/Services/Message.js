import ApiService from '../Services/Api';
import MessageModel from '../Modal/MessageModel';
import ReceiptModel from '../Modal/ReceiptModel';
import {GetUUID,PushObjectByKey,AddSingleObjectValueInArryByKey,PopObjectByKey,
  PushAKeyInObjectByKey,UpdateSingleValueByKey} from '../Helpers/ArrayHelper';
import MessageTypeSchema from '../Modal/MessageTypeSchema';
import MessageSchema from '../Modal/MessageSchema';
import {messageConstants} from "../Constants/States/messages";

class Message{

constructor(){}
SendMessage(client,message,states){           
   let Message=new MessageModel();
   Message.id=new Date().getTime().toString();
   Message.to=states.active_channel.channel_name;
   Message.key=states.active_channel.channel_key;
   Message.from=states.user.username;
   Message.type=message.type;
   Message.content=message.content;
   Message.size=message.size;
  // Message.isGroupMsg=message.isGroupMsg;
  Message.Send(client);

}
SendReciept(client,message,states){
    let Receipt=new ReceiptModel();
    let receiptType=(states.active_channel.channel_name==message.to)?3:2;
   //Receipt.date=parseFloat(new Date().getTime()/1000);
   Receipt.from=states.user.username;
   Receipt.key=message.key;
   Receipt.messageId=message.id;
   Receipt.receiptType=receiptType;
   Receipt.topic=message.to;
   Receipt.Send(client);
}
// MessageService.SetMessage(this.Client, res, this.props);
SetMessage(client,message,states){
    let Receipt=new ReceiptModel();
    let Message=new MessageModel();
    let isMessage=Message.MapMessage(message);
    let isReceipt=Receipt.MapReceipt(message);
    console.log("====SetMessage===Map==",isMessage,isReceipt,message);
    if(isMessage){
        if(message.type== MessageTypeSchema.Text)  
        this.SaveTextMessage(client,message,states);
        if(message.type== MessageTypeSchema.Path)  
        this.SaveTextMessage(client,message,states);
        if(message.type== MessageTypeSchema.Thumbnail) 
        this.SaveTextMessage(client,message,states);
        if(message.type== MessageTypeSchema.Image) 
        this.SaveImageMessage(client,message,states);
        if(message.type== MessageTypeSchema.Audio) 
        this.SaveAudioMessage(client,message,states);
        if(message.type== MessageTypeSchema.Video) 
        this.SaveVideoMessage(client,message,states);
        if(message.type== MessageTypeSchema.File) 
        this.SaveFileMessage(client,message,states);
        if(message.type== MessageTypeSchema.Typing) 
        this.SaveTextTyping(client,message,states);
    }
    if(isReceipt){
      this.ChangeMessageStatus(message,states);
    }
  //  console.log("====SetMessage===Map",Message.MapMessage(message),message,states);

}
SaveImageMessage(client,message,states){
  this.SetMediaMessageList(message,states);
  if(!message.isBuffering)
  this.SendReciept(client,message,states);
  this.SaveCurrentMessage(message,states);
}
SaveAudioMessage(client,message,states){
  this.SetMediaMessageList(message,states);
  if(!message.isBuffering)
  this.SendReciept(client,message,states);
  this.SaveCurrentMessage(message,states);
}
SaveVideoMessage(client,message,states){
  this.SetMediaMessageList(message,states);
  if(!message.isBuffering)
  this.SendReciept(client,message,states);
  this.SaveCurrentMessage(message,states);
}
SaveFileMessage(client,message,states){
  this.SetMediaMessageList(message,states);
  if(!message.isBuffering)
  this.SendReciept(client,message,states);
  this.SaveCurrentMessage(message,states);
}

SaveTextMessage(client,message,states){
this.SetMessageList(message,states);
this.SendReciept(client,message,states);
this.SaveCurrentMessage(message,states);
}
SetMediaMessageList(message,states){
  let index=-1;
  if(message.content.length > 0){
    let MessageList=[...states.MessageFileList];
    console.log("Good Day Puri List",MessageList);
    console.log("Good Day M List",message);
     let NewArray=[];
      index=MessageList.length; 
     for(var i=0; i < MessageList.length;i++){
      var newMessage=MessageList[i]; 
      NewArray.push(newMessage);
     } 
     NewArray.push(message.content);
    states.dispatch({type:messageConstants.MESSAGE_FILE_LIST,messages:NewArray});
  }
  let listMessage={...message,content:"",index:index};
  this.SetMessageList(listMessage,states);

  
  }
SetMessageList(message,states){
let MessageList=states.MessageList;
let messgKey=message.to.split("?")[0];
let revisedList=UpdateSingleValueByKey(MessageList,messgKey,message,"id",message.id);
states.dispatch({type:messageConstants.MESSAGE_LIST,messages:revisedList});
}
SaveTextTyping(client,message,states){
if(message.from!=states.user.username)  
this.SetTextTypingList(message,states);
}
SetTextTypingList(message,states){
  let MessageTypingList=states.MessageTypingList;
  let messgKey=message.to.split("?")[0];
  let revisedList=[];
   if(message.content=='0')
   revisedList=PopObjectByKey(MessageTypingList,message.from,messgKey);
   if(message.content=='1')
   revisedList=PushObjectByKey(MessageTypingList,message.from,messgKey);
  states.dispatch({type:messageConstants.MESSAGE_TYPING_LIST,messages:revisedList});
}
SaveCurrentMessage(message,states){
  let Message=new MessageModel();
  let MessageCurrentList=states.MessageCurrentList;
  let messgKey=message.to.split("?")[0];
  let content=Message.MapCurrentMessage(message);
  let revisedList=AddSingleObjectValueInArryByKey(MessageCurrentList,content,messgKey);
  states.dispatch({type:messageConstants.MESSAGE_CURRENT_LIST,messages:revisedList});
}
ChangeMessageStatus(message,states){
let messageList=states.MessageList;
let messgKey=message.topic.split("?")[0];
let revisedList=PushAKeyInObjectByKey(messageList,messgKey,"id",message.messageId,"status",message.receiptType);
states.dispatch({type:messageConstants.MESSAGE_LIST,messages:revisedList});
}


}
const MessageService=new Message();
export  default MessageService;
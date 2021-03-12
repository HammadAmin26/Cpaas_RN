import ApiService from '../Services/Api';
import MessageModel from '../Modal/MessageModel';
import ReceiptModel from '../Modal/ReceiptModel';
import FileOptionModel from '../Modal/FileOptionModel';
import {GetUUID,PushObjectByKey,AddSingleObjectValueInArryByKey,PopObjectByKey,PushAKeyInObjectByKey} from '../Helpers/ArrayHelper';
import MessageTypeSchema from '../Modal/MessageTypeSchema';
import {messageConstants} from "../Constants/States/messages";

class File{

constructor(){}
SendFile(client,message,states){
    let fileOptions= new FileOptionModel();
    fileOptions.topic=states.active_channel.channel_name;
    fileOptions.key=states.active_channel.channel_key;
    fileOptions.from=states.user.username;
    fileOptions.type=message.type;
    fileOptions.Send(client,message.content)

}

}
const FileService=new File();
export  default FileService;
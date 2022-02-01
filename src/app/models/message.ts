import { Attachment } from "./attachment"

export class Message {
  constructor(
    public _id?:String,
     public sender_id?:String,
    public textContent?: String,
    public attachmentents?: [Attachment],
    public hasAttachment?:Boolean,
    public send_date?: Date,
    public mine?:boolean,
    public appData?:{
      selected?:boolean,
      showMenu?:boolean,
      edit?:boolean,
      tempText?:String
    }){
    
    }
}

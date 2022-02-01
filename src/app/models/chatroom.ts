import { Message } from "./message"



export class Chatroom {
    _id:String
    name: String
    description:String
    photoUrl:String
    owner: String
    thumbnailUrl :String
    created_Date: Date
    message_count: Number
    private:boolean
    messages: [Message]
    members:[String]
    lastMessage: Message
}

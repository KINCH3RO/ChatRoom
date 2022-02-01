import { FreindRequest } from "./freind-request"

export class User {
    _id?:string
    username?: string
    email?: string
    password?: string
    birth?: Date
    joinDate?: Date
    photoUrl?: string
    thumbnailUrl? :string
    friends?:[FreindRequest]
}

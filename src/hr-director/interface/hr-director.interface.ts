import { Document } from "mongoose";
export interface Ihrdirector extends Document{
    readonly name:string;
    readonly email:string;
    readonly password:string;
    readonly address:string;
    readonly phone:number;
    readonly refreshToken: string;
    readonly email2:string
}
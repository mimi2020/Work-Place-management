import { Document } from "mongoose";
export interface IUser extends Document {
    readonly name:string;
    readonly email:string;
    readonly password:string;
    readonly address:string;
    readonly phone:string;
    readonly ID_departement:string;
    readonly photo:string;
    // readonly ID_departement?:string;
    readonly items:string;
     refreshToken: string;
}
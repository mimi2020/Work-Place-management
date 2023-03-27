import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import * as argon2 from 'argon2';
import { Departement } from "src/departement/entities/departement.entity";
import {Types, SchemaTypes} from "mongoose";
@Schema()
export class User {
@Prop()
name:string;
@Prop()
email:string;
@Prop()
password:string;
@Prop()
address:string;
@Prop()
phone:number;
//add reftrech token to be added in case of login



@Prop({type:SchemaTypes.ObjectId, ref:'Departement'})
ID_departement:Departement;


@Prop()
   refreshToken: string;


}

//export const UserSchema = SchemaFactory.createForClass(User)


export const UserSchema = SchemaFactory.createForClass(User).pre("save",async function(){

   //this.password=await bcrypt.hash(this.password, 10);
   this.password = await argon2.hash(this.password);
   
 });
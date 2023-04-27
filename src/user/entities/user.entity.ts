import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import * as argon2 from 'argon2';
import { Departement } from "src/departement/entities/departement.entity";
import {Types, SchemaTypes} from "mongoose";

import { HrDirector } from "src/hr-director/entities/hr-director.entity";
import { HydratedDocument } from "mongoose";
export type UserDocument = HydratedDocument<User>;
@Schema({ discriminatorKey: 'items' })
export class User {

   @Prop({ type: String, required: true, enum: [HrDirector.name,User.name] })
   items: string
@Prop()
name:string;
@Prop()
email:string;
@Prop()
password:string;
@Prop()
address:string;
@Prop()
phone:string;
@Prop()
photo:string
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
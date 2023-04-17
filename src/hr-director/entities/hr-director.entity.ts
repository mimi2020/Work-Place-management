import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/entities/user.entity";
import * as argon2 from 'argon2';
import { HydratedDocument } from "mongoose";
export type DeliveryDocument = HydratedDocument<HrDirector>
@Schema()
export class HrDirector{

    @Prop()
    email2:string

    @Prop()
    items:string

}


export const hr_directorSchema=SchemaFactory.createForClass(HrDirector)


// export const hr_directorSchema=SchemaFactory.createForClass(HrDirector).pre("save",async function(){

//     //this.password=await bcrypt.hash(this.password, 10);
//     this.password = await argon2.hash(this.password)})
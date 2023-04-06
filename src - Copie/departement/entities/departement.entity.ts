
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { SchemaTypes,Types } from "mongoose";

import { User } from "src/user/entities/user.entity";
@Schema()
export class Departement {

    @Prop()
   
    name: string;


    
    @Prop({type:SchemaTypes.ObjectId, ref:'User'})
    HeadOfDepartement:User;

   
    @Prop([{type:SchemaTypes.ObjectId, ref:'User'}])
    ListOfEmployers:[User];

    
   

}

 export const SchemaDepartement=SchemaFactory.createForClass(Departement)

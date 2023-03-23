
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@Schema()
export class Departement {

    @Prop()
   
    name: string


    @Prop()
    
    HeadOfDepartement: number

    @Prop()
    
    AllTeam: number

}

 export const SchemaDepartement=SchemaFactory.createForClass(Departement)

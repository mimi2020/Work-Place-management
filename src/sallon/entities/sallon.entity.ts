import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@Schema()
export class Sallon {

    @Prop()
   
    name: string


    @Prop()
    
    capacity: number

}

 export const SchemaSalon=SchemaFactory.createForClass(Sallon)

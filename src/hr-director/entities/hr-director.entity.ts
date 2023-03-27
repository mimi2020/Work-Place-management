import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/entities/user.entity";


@Schema()
export class HrDirector extends User {

    @Prop()
    email2:string
}


export const hr_directorSchema=SchemaFactory.createForClass(HrDirector)
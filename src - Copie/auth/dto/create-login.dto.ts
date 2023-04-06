import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateLoginDto {

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    }) 

    @IsNotEmpty()
    readonly email: string;


    @ApiProperty({
        type: String,
        description: 'This is a required property',
    }) 

    @IsNotEmpty()
    readonly password: string;

}

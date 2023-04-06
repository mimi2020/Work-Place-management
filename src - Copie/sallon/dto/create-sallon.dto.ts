import { ApiProperty } from '@nestjs/swagger/dist';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateSallonDto {

    @ApiProperty({ type: String, description: 'required' })
     @IsNotEmpty() 
     @IsString() 
     name: string;


     @ApiProperty({ type: Number, description: 'required' })
     @IsNumber()
    @IsNotEmpty()
    capacity: number
}

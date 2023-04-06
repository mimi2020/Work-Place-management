
import { ApiProperty } from '@nestjs/swagger/dist';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateDepartementDto {

    @ApiProperty({ type: String, description: 'required' }) 
    @IsNotEmpty()
     @IsString() 
     name: string;

     @ApiProperty({ type: String }) 
    
    HeadOfDepartement:string

    @ApiProperty({ type: String}) 
   
    
     ListOfEmployers:string[];

}
    

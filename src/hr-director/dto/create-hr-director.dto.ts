
import { ApiProperty } from '@nestjs/swagger/dist';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { CreateUserDto } from "src/user/dto/create-user.dto";


export class CreateHrDirectorDto  {
    @ApiProperty({ type: String, description: 'required' }) @IsNotEmpty() @IsEmail() email2: string;
    refreshToken: string;
    items: string;
}

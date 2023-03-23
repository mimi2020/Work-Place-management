import { ApiProperty } from '@nestjs/swagger/dist';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateUserDto {


  @ApiProperty({ type: String, description: 'required' }) @IsNotEmpty() @IsString() name: string;
  @ApiProperty({ type: String, description: 'required' }) @IsNotEmpty() @IsEmail() email: string;
  @ApiProperty({ type: String, description: 'required' }) @IsNotEmpty() @IsString() password: string;
  @ApiProperty({ type: String, description: 'required' }) @IsNotEmpty() @IsString() address: string;
  @ApiProperty({ type: Number, description: 'required' }) @IsNotEmpty() @IsNumber() phone: number;
  refreshToken: string;

}

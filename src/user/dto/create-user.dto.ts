import { ApiProperty } from '@nestjs/swagger/dist';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateUserDto {


  @ApiProperty({ type: String, description: 'required' }) @IsNotEmpty() @IsString() name: string;
  @ApiProperty({ type: String, description: 'required' }) @IsNotEmpty() @IsEmail() email: string;
  @ApiProperty({ type: String, description: 'required' }) @IsNotEmpty() @IsString() password: string;
  @ApiProperty({ type: String, description: 'required' }) @IsNotEmpty() @IsString() address: string;
  @ApiProperty({ type: String, description: 'required' }) @IsNotEmpty() @IsString() phone: string;

  @ApiProperty({ type: String, description: 'required' }) @IsNotEmpty() @IsString() ID_departement:string;
  @ApiProperty({ type: String, description: 'required' }) @IsNotEmpty() @IsString() items:string;
  refreshToken: string;
  @ApiProperty({ type: String, description: 'required' }) @IsNotEmpty() @IsString() photo: string;
}

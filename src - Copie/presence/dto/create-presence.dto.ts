import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreatePresenceDto {
  @ApiProperty({ type: String, description: 'required' })
  @IsString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ type: String, description: 'required' })
  @IsString()
  @IsNotEmpty()
  user: string;

  //   @ApiProperty({ type: String, description: 'required' })
  //   @IsString()
  //   @IsNotEmpty()
  //  timestamps:true
}

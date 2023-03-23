import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';

@Module({
  //add the configure of Mongo db by the forFeature function
  // the function has two values the schema and the name of this schema coded in the entity file
  imports:[MongooseModule.forFeature([{schema:UserSchema, name:'User'}])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

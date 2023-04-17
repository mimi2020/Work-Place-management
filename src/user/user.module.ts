import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import {SchemaDepartement} from '../departement/entities/departement.entity'
import { MulterModule } from '@nestjs/platform-express/multer';
@Module({
  //add the configure of Mongo db by the forFeature function
  // the function has two values the schema and the name of this schema coded in the entity file


  imports:[
    MulterModule.register({dest:'./upload'}),
    
    MongooseModule.forFeature([{schema:UserSchema, name:'User'}]),
  MongooseModule.forFeature([{schema:SchemaDepartement, name:'departement'}])

],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import {SchemaDepartement} from '../departement/entities/departement.entity'
import { MulterModule } from '@nestjs/platform-express/multer';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {AccessTokenStrategy}from '../auth/jwt.strategy';
import { LocalStrategy } from '../auth/local.strategy';
import { AuthService } from 'src/auth/auth.service';
@Module({
  //add the configure of Mongo db by the forFeature function
  // the function has two values the schema and the name of this schema coded in the entity file


  imports:[
    MulterModule.register({dest:'./upload'}),
    
    MongooseModule.forFeature([{schema:UserSchema, name:'User'}]),
  MongooseModule.forFeature([{schema:SchemaDepartement, name:'departement'}]),
  PassportModule, JwtModule.register({
    secret: 'pfe',
    signOptions: { expiresIn: '60s' },
  }),

],
  controllers: [UserController],
  providers: [AuthService,UserService,JwtService,LocalStrategy,AccessTokenStrategy],
  exports: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/entities/user.entity';
//import { JwtStrategy } from './jwt.strategy';
import {AccessTokenStrategy}from './jwt.strategy';
import { RefreshTokenStrategy } from './refreshToken.strategy';
import { hr_directorSchema } from 'src/hr-director/entities/hr-director.entity';
import {HrDirectorModule} from "../hr-director/hr-director.module"
import { HrDirectorService } from 'src/hr-director/hr-director.service';
import { SchemaDepartement } from 'src/departement/entities/departement.entity';
import { SchemaSalon } from 'src/sallon/entities/sallon.entity';


@Module({
  imports: [UserModule,HrDirectorModule, PassportModule, JwtModule.register({
    secret: 'houssem',
    signOptions: { expiresIn: '60s' },
  }),
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    MongooseModule.forFeature([{schema:hr_directorSchema, name:'hr-director'}]),
    MongooseModule.forFeature([{schema:SchemaDepartement, name:'departement'}]),
    MongooseModule.forFeature([{schema:SchemaSalon, name:'sallon'}])
  ],
  providers: [AuthService,LocalStrategy,AccessTokenStrategy,RefreshTokenStrategy,HrDirectorService]
  ,
  controllers: [AuthController],
})
export class AuthModule { }

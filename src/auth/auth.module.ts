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

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: 'houssem',
    signOptions: { expiresIn: '60s' },
  }),
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
  ],
  providers: [AuthService,LocalStrategy,AccessTokenStrategy,RefreshTokenStrategy]
  ,
  controllers: [AuthController],
})
export class AuthModule { }

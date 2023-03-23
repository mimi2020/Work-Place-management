import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
//import { ExtractJwt, Strategy } from 'passport-local';
import { IUser } from '../user/interfaces/user.interface';
import { AuthService } from './auth.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy,"jwt") {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "houssem",

    });
  }

  async validate(payload: any) {
    console.log("access token sta ",payload);
    return { email: payload.email,sub:payload.sub };
  }
}

















// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: process.env.JWT_ACCESS_SECRET,
//     });
//   }

//   async validate(payload: any) {
//     console.log("payload in jwt startiji",payload);
//     return { email: payload.email,
//              _id:payload.sub 
    
//     };
//   }
// }
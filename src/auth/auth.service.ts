import { ForbiddenException, Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService, private jwtSerivce: JwtService) {

  }

  async validateUser(email: string, password: string): Promise<any> {
    console.log('%cusers.service.ts line:56 email', 'color: #007acc;', email);
    const user = await this.userService.getUserByEmail(email);
    if (!user) return null;
    const passwordValid = await argon2.verify(user.password,password)
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }


  
  async login(user: any) {

    const refreshToken = this.jwtSerivce.sign(
      {
        sub: user._id,
        email: user.email,
      },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      },
    )
    await this.updateRefreshToken(user._id, refreshToken);

    return {
      access_token: this.jwtSerivce.sign(
        {
          sub: user._id,
          email: user.email,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '15m',
        },
      ),
      refreshToken: refreshToken

    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update2(userId, {
      refreshToken: hashedRefreshToken,
    });
  }
  hashData(data: string) {
    return argon2.hash(data);
  }

  async logout(userId: string) {
    console.log("userId is:",userId)
    return this.userService.update2(userId, { refreshToken: null });
  }

  async refreshTokens(userId: string, refreshToken: string) {

    const user = await this.userService.findOne(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
      console.log("in auth.service if not user or not refresh token")
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    console.log("if not refresh token matches")
    const refreshTokenAfter = this.jwtSerivce.sign(
      {
        sub: user._id,
        email: user.email,
      },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      },
    )

    await this.updateRefreshToken(user.id, refreshTokenAfter);

    return {
      access_token: this.jwtSerivce.sign(
        {
          sub: user._id,
          email: user.email,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '15m',
        },
      ),
      refreshToken: refreshToken

    };
  }
}


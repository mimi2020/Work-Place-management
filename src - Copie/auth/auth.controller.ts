
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateLoginDto } from './dto/create-login.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

//this way to add the zone of text in swagger to make the login
@ApiBody({ schema:{
  properties:{
    'email':{type:'string'},
    'password':{type:'string'}
  }
}})
  
  
  
  @UseGuards(AuthGuard('local'))
  //@UseGuards(AccessTokenGuard)
  @Post('/login')
  async login(@Request() req) {
    console.log('%cauth.controller.ts line:14 req', 'color: #007acc;', req.user);
    return this.authService.login(req.user);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/logout')
  logout(@Request() req) {
    console.log("req.user in auth controller",req.user.sub)

   this.authService.logout(req.user.sub);
  
  }

  //@ApiBearerAuth('refresh-token')
  // add the apiBody to make the way to add the refresh token
  @ApiBody({ schema:{
    properties:{
     
      'refreshToken':{type:'string'}
    }
  }})

  @ApiBearerAuth('refresh-token')// to make the put of refresh-token on swagger
 @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  refreshTokens(@Request() req){
    const userId= req.user['sub'];
    console.log("userId",userId)
    const refreshToken = req.user['refreshToken'];
    console.log("refreshToken",refreshToken)
    return this.authService.refreshTokens(userId,refreshToken)
  }

}

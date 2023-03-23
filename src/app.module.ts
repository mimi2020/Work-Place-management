import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SallonModule } from './sallon/sallon.module';
@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017", { dbName: "Work-place-management" }),

  UserModule,
  
  AuthModule,

  
  ConfigModule.forRoot(),

  
  SallonModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

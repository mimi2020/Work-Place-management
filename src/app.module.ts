import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SallonModule } from './sallon/sallon.module';
import { DepartementModule } from './departement/departement.module';
import { HrDirectorModule } from './hr-director/hr-director.module';
@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017", { dbName: "Work-place-management" }),

  UserModule,
  
  AuthModule,

  
  ConfigModule.forRoot(),

  
  SallonModule,

  
  DepartementModule,

  
  HrDirectorModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

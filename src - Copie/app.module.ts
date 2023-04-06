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
import { PresenceModule } from './presence/presence.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017", { dbName: "Work-place-management" }),

  UserModule,
  
  AuthModule,

  
  ConfigModule.forRoot(),

  
  SallonModule,

  
  DepartementModule,

  
  HrDirectorModule,

  
  PresenceModule,
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', '..', '..', 'dist', 'client'),
    
    exclude: ['/api*'],
  }),

],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

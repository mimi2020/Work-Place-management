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

import { EmailService } from './email/email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017", { dbName: "Work-place-management" }),

  UserModule,
  
  AuthModule,

  
  ConfigModule.forRoot(),

  
  SallonModule,

  
  DepartementModule,

  
  HrDirectorModule,

  
  PresenceModule,
  // ServeStaticModule.forRoot({
  //   rootPath: join(__dirname, '..', '..', '..', 'Work-Place-management', 'client'),
    
  //   exclude: ['/api*'],
  // }),
  // ServeStaticModule.forRoot({
  //   rootPath: join(__dirname, '..', 'client'),
  //   exclude: ['/api*'],
  // }),
  MailerModule.forRoot({
    // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
    // or
  //   transport: {
  //     host: 'sandbox.smtp.mailtrap.io',
  //         port: 2525,
  //         auth: {
  //           user: "1f90d744e76860",
  // pass: "22128dc7d83407"
  //         }

  //   },
  transport :{
   host: "sandbox.smtp.mailtrap.io",

    port: 2525,
    auth: {
     user: "1f90d744e76860",
     pass: "22128dc7d83407"
    
    }
  },
    defaults: {
      from: '"No Reply" <noreply@example.com>',
    },
    template: {
      dir: join(__dirname, 'templates'),
      adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
      options: {
        strict: true,
      },
    },
  }),
 
],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}

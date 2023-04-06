import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// added by me
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import * as basicAuth from 'express-basic-auth';
async function bootstrap() {
 const app = await NestFactory.create(AppModule);
 app.enableCors();

 // this is for the validation
 app.useGlobalPipes(new ValidationPipe());
// end of validation

//to add the auth swagger with pass and username
// app.use(
//     ['/api','/docs-json']
//     ,
//     basicAuth({challenge:true, users:{["admin"]:"admin",},})
//     );
// end of auth swagger


 //this code is added for swagger
const config = new DocumentBuilder()
// .setTitle('Ecommerce Nest')
// .setDescription('This is an Api of ecommerce')
// .setVersion('1.0')
// .addTag('auth')
// .addTag('user')
// .addTag('category')
// .addTag('product')
// .addTag('customers')
// .addTag('providers')
// //to add a way to put token on swaswagger
// .addBearerAuth({
//     description:'texte',
//     name:'Authorization',
//     bearerFormat:'bearer',
//     type:'http',
//     in:'Header'
// },'access-token')
// //end
// // .build();
// const document=SwaggerModule.createDocument(app,config);
// SwaggerModule.setup('api',app,document);
//*********************** */
 //end of  swagger config



 await app.listen(3000);
 
}
bootstrap();

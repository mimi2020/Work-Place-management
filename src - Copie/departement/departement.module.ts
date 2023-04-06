import { Module } from '@nestjs/common';
import { DepartementService } from './departement.service';
import { DepartementController } from './departement.controller';
import { MongooseModule
 } from '@nestjs/mongoose';
 import {SchemaDepartement} from './entities/departement.entity'
@Module({
  imports:[MongooseModule.forFeature([{schema:SchemaDepartement, name:'departement'}])],
  controllers: [DepartementController],
  providers: [DepartementService]
})
export class DepartementModule {}

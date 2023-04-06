import { Module } from '@nestjs/common';
import { HrDirectorService } from './hr-director.service';
import { HrDirectorController } from './hr-director.controller';
import { hr_directorSchema } from './entities/hr-director.entity';
import { MongooseModule } from '@nestjs/mongoose';
import {SchemaDepartement} from '../departement/entities/departement.entity';
import {SchemaSalon} from '../sallon/entities/sallon.entity'
@Module({
  imports:[MongooseModule.forFeature([{schema:hr_directorSchema, name:'hr-director'}]),
  MongooseModule.forFeature([{schema:SchemaDepartement, name:'departement'}]),

  MongooseModule.forFeature([{schema:SchemaSalon, name:'sallon'}])

],
  controllers: [HrDirectorController],
  providers: [HrDirectorService]
})
export class HrDirectorModule {}

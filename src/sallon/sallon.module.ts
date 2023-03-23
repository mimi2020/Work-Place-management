import { Module } from '@nestjs/common';
import { SallonService } from './sallon.service';
import { SallonController } from './sallon.controller';
import { SchemaSalon } from './entities/sallon.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{schema:SchemaSalon, name:'sallon'}])],
    controllers: [SallonController],
  providers: [SallonService]
})
export class SallonModule {}

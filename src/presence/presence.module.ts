import { Module } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { PresenceController } from './presence.controller';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { Presence, presenceschema } from './entities/presence.entity';
import { UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: presenceschema, name: 'Presence' }]),
    MongooseModule.forFeature([{ schema: UserSchema, name: 'User' }]),
  ],
  controllers: [PresenceController],
  providers: [PresenceService],
})
export class PresenceModule {}

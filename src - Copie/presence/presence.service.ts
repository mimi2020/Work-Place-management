import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';
import { IPresence } from './interface/presence.interface';
import { Model } from 'mongoose';
import { IUser } from '../user/interfaces/user.interface';

@Injectable()
export class PresenceService {
  constructor(
    @InjectModel('Presence') private presenceModel: Model<IPresence>, // @InjectModel('departement') private departementModel: Model<IDepartement>,
    @InjectModel('User') private userModel: Model<IUser>,
  ) {}

  async create(CreatePresenceDto: CreatePresenceDto): Promise<IPresence> {
    const newpresence = await new this.presenceModel(CreatePresenceDto);

    return newpresence.save();
  }
  // @Injectable()
  // export class PresenceService {
  //   constructor(
  //     @InjectModel('presence') public presenceModel: Model<IPresence>,
  //   ) {}
  //   async create(createPresenceDto: CreatePresenceDto): Promise<IPresence> {
  //     const newprsence = await new this.presenceModel(createPresenceDto);
  //     return newprsence;
  //   }

  findAll() {
    return this.presenceModel
      .find()
      .populate('user', '', this.userModel)
      .exec();
  }

  findOne(id: string) {
    return this.presenceModel
      .findById({ _id: id })
      .populate('user', '', this.userModel)
      .exec();
  }

  update(id: string, updatePresenceDto: UpdatePresenceDto) {
    return this.presenceModel.findByIdAndUpdate({ _id: id }, updatePresenceDto);
  }

  remove(id: string) {
    return this.presenceModel.findByIdAndRemove({ _id: id });
  }
 
}


import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateHrDirectorDto } from './dto/create-hr-director.dto';
import { UpdateHrDirectorDto } from './dto/update-hr-director.dto';
import { Model } from 'mongoose';
import { Ihrdirector } from './interface/hr-director.interface';
//import { IPresence } from 'src/presence/interface/presence.interface';

import { IDepartement } from 'src/departement/interface/departement.interface';
import { ISallon } from 'src/sallon/interface/sallon.interface';

@Injectable()
export class HrDirectorService {
  constructor(
    @InjectModel('hr-director')
    private hrDirectModel: Model<Ihrdirector>,
   // @InjectModel('Presence') private presenceModel: Model<IPresence>, // @InjectModel('departement') private departementModel: Model<IDepartement>,

    @InjectModel('departement')
    private departementModel: Model<IDepartement>,

    @InjectModel('sallon') private sallonModel: Model<ISallon>, // @InjectModel('departement') private departementModel: Model<IDepartement>,
  ) {}

  async create(createHrDirectorDto: CreateHrDirectorDto): Promise<Ihrdirector> {
    const nwehrdirector = await new this.hrDirectModel(createHrDirectorDto);
    return nwehrdirector.save();
  }

  async findAll(): Promise<Ihrdirector[]> {
    return await this.hrDirectModel.find().exec();
  }

  async findOne(id: string): Promise<Ihrdirector> {
    return await this.hrDirectModel.findById({_id: id }).exec();
  }

  async update(
    id: string,
    updateHrDirectorDto: UpdateHrDirectorDto,
  ): Promise<Ihrdirector> {
    return await this.hrDirectModel.findByIdAndUpdate(
      { _id: id },
      updateHrDirectorDto,
    );
  }

  remove(id: string) {
    return this.hrDirectModel.findByIdAndDelete({ _id: id }).exec();
  }

  async reservation(id: string): Promise<ISallon> {
    const iddep = await this.departementModel
      .findById({ _id: id })
      .select('-__v')
     
      
    const placedemande = (await iddep).ListOfEmployers.length;
    console.log('*****************PLACES DEMANDEES***********', placedemande);

    const FindSallon = this.sallonModel
      .findOne({})
      .where('nbplace')
      .equals(placedemande + 2)
      //FONCTION DANS mongoose > =
      .exec();

    if (!FindSallon) {
      console.log('NOT FOUND SALLON');
    } else {
      const placeDispo = (await FindSallon).capacity;
      const idSallon = (await FindSallon)._id;
      const nameSallon = (await FindSallon).name;

      console.log('***PLACES  DISPONIBES EN SALON*********', placeDispo);
      console.log('***ID  SALON*********', idSallon);
      console.log('***name  SALON *********', nameSallon);
    }
    return FindSallon;
  }
}

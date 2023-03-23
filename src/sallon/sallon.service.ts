import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSallonDto } from './dto/create-sallon.dto';
import { UpdateSallonDto } from './dto/update-sallon.dto';
import { ISallon } from './interface/sallon.interface';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class SallonService {

  constructor(
    @InjectModel('sallon')
    private sallonModel:Model<ISallon>
  ){}
  async create(createSallonDto: CreateSallonDto) :Promise<ISallon>{
    const newSallon = await new this.sallonModel(createSallonDto)
    return  newSallon.save()
  }

  findAll():Promise<ISallon[]> {
    return this.sallonModel.find()
    .select('-__v')
    .exec()
  }

  findOne(id: string) :Promise<ISallon>{
    return this.sallonModel.findById({_id:id}).exec()
    }

  update(id: string, updateSallonDto: UpdateSallonDto) :Promise<ISallon>{
    return this.sallonModel.findByIdAndUpdate({_id:id},updateSallonDto)
  }

  remove(id: string) {
    return this.sallonModel.findByIdAndDelete({_id:id})
  }
}

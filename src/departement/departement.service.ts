import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDepartementDto } from './dto/create-departement.dto';
import { UpdateDepartementDto } from './dto/update-departement.dto';
import {IDepartement}from './interface/departement.interface'

@Injectable()
export class DepartementService {
  constructor(
  
    @InjectModel('departement')
    private departementModel: Model<IDepartement>,
  ) { }
  async create(createDepartementDto: CreateDepartementDto) {
    const newdep = await new this.departementModel(createDepartementDto)
    return newdep.save();
  }

  findAll() {
    return this.departementModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} departement`;
  }

  update(id: number, updateDepartementDto: UpdateDepartementDto) {
    return `This action updates a #${id} departement`;
  }

  remove(id: number) {
    return `This action removes a #${id} departement`;
  }
}

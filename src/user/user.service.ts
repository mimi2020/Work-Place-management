import { Injectable, Dependencies } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common/exceptions';


@Injectable()
export class UserService {
  // to make the create possible and the create the model in with we 
  // will make our database query we shood create the constructor with the model

  constructor(
    @InjectModel('User')
    private userModel: Model<IUser>,
  ) { }
  async create(createUserDto: CreateUserDto): Promise<IUser> {
    //return 'This action adds a new user';
    const newuser = await new this.userModel(createUserDto);
    return newuser.save();
  }

  async findAll(): Promise<IUser[]> {
    //  return `This action returns all user`;
    // return this.userModel.find().select('__v').exec()
    return this.userModel.find().select('-__v').exec()
  }

  async findOne(id: string): Promise<IUser> {
    //return `This action returns a #${id} user`;
    return this.userModel.findOne({ _id: id })
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    return this.userModel.findOneAndUpdate(({ _id: id }), updateUserDto)
  }

  remove(id: string) {
    // return `This action removes a #${id} user`;
    return this.userModel.findByIdAndDelete({ _id: id })
  }

  async getUserByEmail(email: String): Promise<IUser> {
    const existingUser = await this.userModel.findOne({ email: email }).exec();
    console.log(existingUser)
    if (!existingUser) { throw new NotFoundException(`user with #${email} not found`) }
    return existingUser;
  }


  async update2(
    id: string,
    //email:string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    console.log("id in userService is:", id);
    console.log("updateUserDto is:", updateUserDto);
    return this.userModel
      // .findByIdAndUpdate({_id:id}, updateUserDto, { new: true })
      .findByIdAndUpdate({ _id: id }, updateUserDto)

  }


}

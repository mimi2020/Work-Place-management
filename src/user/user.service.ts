import { Injectable, Dependencies } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common/exceptions';
import { IDepartement } from 'src/departement/interface/departement.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';

import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  // to make the create possible and the create the model in with we 
  // will make our database query we shood create the constructor with the model

  constructor(
    @InjectModel('User')
    private userModel: Model<IUser>,
    @InjectModel('departement')
    private departementModel: Model<IDepartement>,
    private mailerService: MailerService,
    private jwtSerivce: JwtService,
  ) { }
  // async create(createUserDto: CreateUserDto): Promise<IUser> {
  //   //return 'This action adds a new user';
  //   const newuser = await new this.userModel(createUserDto);
  //   return newuser.save();
  // }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    console.log('*****************',createUserDto)
    const newUser = new this.userModel(createUserDto);
    await this.departementModel.updateOne(
      { _id: createUserDto.ID_departement },
      { $push: { ListOfEmployers: newUser._id } },
    );
    return newUser.save();
  }
  async findAll(): Promise<IUser[]> {
    //  return `This action returns all user`;
    // return this.userModel.find().select('__v').exec()
    return await this.userModel.find()
   .populate('ID_departement','',this.departementModel)
    .select('-__v')
    .exec()
  }
  async findItems(items:string): Promise<IUser[]> {
    //  return `This action returns all user`;
    // return this.userModel.find().select('__v').exec()
    return await this.userModel.find({items:items})
   .populate('ID_departement','',this.departementModel)
    .select('-__v')
    .exec()
  }
  async findOne(id: string): Promise<IUser> {
    //return `This action returns a #${id} user`;
    return this.userModel.findOne({ _id: id })
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    return this.userModel.findOneAndUpdate(({ _id: id }), updateUserDto)
  }

  // remove(id: string) {
  //   // return `This action removes a #${id} user`;
  //   return this.userModel.findByIdAndDelete({ _id: id })
  // }

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
 
    return this.userModel
      // .findByIdAndUpdate({_id:id}, updateUserDto, { new: true })
      .findByIdAndUpdate({ _id: id }, updateUserDto, { new: true })
   
      
  }

  async remove(id: string): Promise<IUser> {
    const deletedUser = await this.userModel.findById(id);
    console.log("******deleted user***************",deletedUser)
    if (!deletedUser) {
      throw new NotFoundException(`userID #${id} was not deleted`);
    }
  await Promise.all([
    this.userModel.deleteOne({_id:id}).exec(),
     this.departementModel.updateOne({_id: deletedUser.ID_departement},
      {$pull:{ListOfemployers:deletedUser._id}})
     ])


   
    return deletedUser;

}



async sendUserConfirmation(user: any, token: string) {
  const url = `index2.html/auth/confirm?token=${token}`;
 // const url=`index2.html`
    console.log("*****URL*****",url)
    
   // console.log("*****mailerService*****",mailerService)
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: user.name,
        url,
      },
    });
  }
  async login(user: any) {

    const refreshToken = this.jwtSerivce.sign(
      {
        sub: user._id,
        email: user.email,
      },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      },
    )
    await this.updateRefreshToken(user._id, refreshToken);

    return {
      access_token: this.jwtSerivce.sign(
        {
          sub: user._id,
          email: user.email,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '15m',
        },
      ),
      refreshToken: refreshToken

    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userModel.findOneAndUpdate({_id:userId}, {
      refreshToken: hashedRefreshToken,
    });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }


  async logout(userId:string){
    console.log("userId is:",userId)
    const refreshtoken=null;
    console.log("test",refreshtoken)
    return this.userModel.findOneAndUpdate({_id:userId},refreshtoken)
  }

}
/**import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interface/user.interface';
import { IDepartement } from 'src/departement/interface/departement.interface';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    @InjectModel('departement') private departementModel: Model<IDepartement>,
  ) {}
  //auth
  async update2(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    console.log('id in userService is:', id);
    console.log('updateUserDto is:', updateUserDto);
    return this.userModel.findByIdAndUpdate({ _id: id }, updateUserDto, {
      new: true,
    });
  }

  async getUserByEmail(email: string): Promise<IUser> {
    const existinguser = await this.userModel.findOne({ email: email }).exec();
    console.log(existinguser);
    if (!existinguser) {
      throw new NotFoundException(`user with email #${email} not found`);
    }
    return existinguser;
  }

  //
  // )
  // function create radit'ha promise
  // add(a,b){}
  //dans TS elle a besoin d'type de retour
  // async create(createUserDto: CreateUserDto): Promise<IUser> {
  //   // return 'This action adds a new user';
  //   const newuser = await new this.userModel(createUserDto);
  //   return newuser.save();
  // }
  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = await new this.userModel(createUserDto);
    await this.departementModel.updateOne(
      { _id: createUserDto.Id_Departement },
      { $push: { ListOfemployers: newUser._id } },
    );
    return newUser.save();
  }
  async findAll(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }

  findOne(id: string): Promise<IUser> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate({ _id: id }, updateUserDto);
  }

  // async create(createUserDto: CreateUserDto): Promise<IUser> {
  //   const newUser = await new this.userModel(createUserDto);
  //   await this.departementModel.updateOne(
  //     { _id: createUserDto.Id_Departement },
  //     { $push: { ListOfemployers: newUser._id } },
  //   );
  //   return newUser.save();
  // }

  async remove(id: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    await this.departementModel.findByIdAndUpdate(
      { _id: deletedUser.Id_Departement },
      { $pull: { ListOfemployers: deletedUser._id } },
    );
    if (!deletedUser) {
      throw new NotFoundException(`userID #${id} was deleted`);
    }
    return deletedUser;
  }
  affiche() {
    return 'bonjour from user';
  }
}
 */
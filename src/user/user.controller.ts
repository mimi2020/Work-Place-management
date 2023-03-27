import { Controller, Get, Post, Body, Patch, Param, UseGuards,Delete,Put ,Request,Res} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { Res } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {User} from './entities/user.entity'
import { BadRequestException } from '@nestjs/common/exceptions';
import { ObjectUnsubscribedError } from 'rxjs';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';


@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()

@ApiResponse({
  status: 200,
  description: 'A post has been successfully fetched',
  type: User
})
@ApiResponse({
  status: 404,
  description: 'A post with given id does not exist.'
})
 
 async createUser(@Res() response, @Body() createUserDto:CreateUserDto){
    try {
      const newUser = await this.userService.create(createUserDto);
      console.log(newUser)
      return response.status(HttpStatus.CREATED).json({
        status:200,
        message:"user is created successfully",
        data: newUser,
      })
     
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        //message:"user is created",
        error
      })
    }
  }


// @ApiBearerAuth('access-token')// to make the put of access-token on swagger
//  @UseGuards(AccessTokenGuard)// to make it done only when the user is authorized bu the access-tiken
     
@Get()
  @ApiResponse({
    status:200,
    description:"success to have the list",
    type:Promise<User>
  })
  @ApiResponse({
    status: 404,
    description: 'there is no list found.'
  })
  findAll() {
    return this.userService.findAll();
  }




  @Get(':id')
   @ApiParam({
  name: 'id',
  required: true,
  description: 'Should be an id of a post that exists in the database',
  //type: Number
  type:String
})
  @ApiResponse({
    status:200,
    description:'this is the user found by ID',
    type:User,
  })

  @ApiResponse({
    status:404,
    description:'there is no user'
  })
  async findOne(@Param('id') id: string ,@Res() resonse) {
   // return this.userService.findOne(+id);
   //return this.userService.findOne(id);
   try {
    const user = await this.userService.findOne(id)
    return resonse.status(HttpStatus.ACCEPTED).json({
      data:user,
      message:"the user ByID is",
      status:200
    })
   } catch (error) {
    resonse.status(HttpStatus.BAD_REQUEST).json({
      message:"the user ByID is",
      status:400
    })
   }
  }

  @Put('/update/:id')
  @ApiParam({
    name:'id',
    required:true,
    description:'you should enter an ID',
    type:String
  })

  @ApiResponse({
    status:200,
    description:"sucess to update a user"
  })

  @ApiResponse({
    status:404,
    description:'user can not be updated'
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto , @Res() response) {
    try {
      const userUpdated = await  this.userService.update(id, updateUserDto);
      console.log(userUpdated)
      return response.status(HttpStatus.ACCEPTED).json({
        data:userUpdated,
        message:"the user is updated successfully",
        status:200
      })
     } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({
        message:"the user ByID is",
        status:400
      })
     }
  }

  @Delete(':id')
  @ApiParam({
    name:'id',
    description:'id to delted',
    required:true,
    type:String
  })


  @ApiResponse({
    status:200,
    description:"ook it is deleted"
  })

  @ApiResponse({
    status:404,
    description:'user can not be deletd'
  })
  async remove(@Param('id') id: string ,@Res() response) {
   try {
    await this.userService.remove(id)
    response.status(HttpStatus.ACCEPTED).json({
      message:"the user was removed successfully",
      status:200
    })
   } catch (error) {
    response.status(HttpStatus.BAD_REQUEST).json({
      message:"the user can not be removed",
      status:200
    })
   }
  }

  


}
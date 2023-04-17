import { Controller, Get, Post, Body, Patch, Param, UseGuards,Delete,Put ,Request,Res,UseInterceptors,UploadedFile} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { Res } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags,ApiBody ,ApiConsumes} from '@nestjs/swagger';
import {User} from './entities/user.entity'
import { BadRequestException } from '@nestjs/common/exceptions';
import { ObjectUnsubscribedError } from 'rxjs';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import {CreateEmailDto} from "../email/dto/create-email.dto"
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// import { FileInterceptor } from '@nestjs/platform-express/multer';
@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

//   @Post()

// @ApiResponse({
//   status: 200,
//   description: 'A post has been successfully fetched',
//   type: User
// })
// @ApiResponse({
//   status: 404,
//   description: 'A post with given id does not exist.'
// })
 
//  async createUser(@Res() response, @Body() createUserDto:CreateUserDto){
//     try {
//       const newUser = await this.userService.create(createUserDto);
//       console.log(newUser)
//       return response.status(HttpStatus.CREATED).json({
//         status:200,
//         message:"user is created successfully",
//         data: newUser,
//       })
     
//     } catch (error) {
//       return response.status(HttpStatus.BAD_REQUEST).json({
//         //message:"user is created",
//         error
//       })
//     }
//   }

@ApiBody({
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string' },
       email: { type: 'string' },
       items: { type: 'string' },
       password : { type: 'string' },
       address : { type: 'string' },
      phone : { type: 'string' },
      ID_departement :{ type: 'string' },
     photo: {
      type: 'string',
      format: 'binary',
    },
    },
  },
})
@ApiConsumes("multipart/form-data")
@UseInterceptors(
  FileInterceptor("photo", {
    storage: diskStorage({
      destination:"./upload/user",
      filename: (_request, file, callback) =>
        callback(null, `${new Date().getTime()}-${file.originalname}`),
    }),
  }),
)
@Post()
async create(@Res () response ,@Body() createUserDto: CreateUserDto,file: Express.Multer.File) {
  console.log("*****ok***",createUserDto)
   createUserDto.photo=file.filename
 try {
  const items= await  this.userService.create(createUserDto);
  return response.status(200).json({
     status:"200",
     message:"successfully",
     data: {
      name: items.name,
      password: items.password,
      // firstname: items.firstname,
      // mobile: items.mobile,
      email: items.email,


    }
 
  });
 } catch (err) {
  return response.status(500).json({
   status:"500",
   message:err.message,
   data: null
 });
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
 async  findAll(@Res() response) {
    // return this.userService.findAll();
    try {
      const  list=await this.userService.findAll()
      console.log("#######",list)
       response.status(HttpStatus.ACCEPTED).json({
        message:"the user was removed successfully",
        status:200,
        data:list
      })
     } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({
        message:"the user can not be removed",
        status:200
      })
     }
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


  @Get(':items')
  @ApiParam({
 name: 'items',
 required: true,
 description: 'Should be an id of a post that exists in the database',
 //type: Number
 type:String
})
  @ApiResponse({
    status:404,
    description:'there is no user'
  })
  async find(@Param('items') items: string ,@Res() resonse) {
  
   try {
    const user = await this.userService.findItems(items)
    return resonse.status(HttpStatus.ACCEPTED).json({
      data:user,
      message:"the user items is",
      status:200
    })
   } catch (error) {
    resonse.status(HttpStatus.BAD_REQUEST).json({
      message:"the user items is",
      status:400
    })
   }
  }







  @Put('/update/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    //type: Number
    type: String
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
         email: { type: 'string' },
         items: { type: 'string' },
         password : { type: 'string' },
         address : { type: 'string' },
        phone : { type: 'string' },
        ID_departement :{ type: 'string' },
       photo: {
        type: 'string',
        format: 'binary',
      },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor("photo", {
      storage: diskStorage({
        destination: "./upload/user",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  @Patch(':id')
  async update(@Res() response, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto,@UploadedFile() file: Express.Multer.File) {
    //  return this.userService.update(id, updateUserDto);
    updateUserDto.photo = await file.filename
    const updateuser = await this.userService.update(id, updateUserDto);
    try {
      response.status(HttpStatus.ACCEPTED).json({
        message: "update successfully,",
        status: 200,
        data: updateuser
      })
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({
        message: " failed to update user",
        status: 500
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

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
         email: { type: 'string' }
      }
    }
  }
  )
  @Post("mail")
  async signUp(@Body() req:CreateEmailDto) {
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    
    const user={name:req.name,email:req.email}
    console.log("*****USER*****",user)
    await this.userService.sendUserConfirmation(user, token);
    console.log("*****USER:TOKEN*********",token)
  }



}
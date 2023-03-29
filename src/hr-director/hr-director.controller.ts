import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HrDirectorService } from './hr-director.service';
import { CreateHrDirectorDto } from './dto/create-hr-director.dto';
import { UpdateHrDirectorDto } from './dto/update-hr-director.dto';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { response } from 'express';
import { HttpStatus } from '@nestjs/common/enums';
import { Ihrdirector } from './interface/hr-director.interface';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ISallon } from 'src/sallon/interface/sallon.interface';
@Controller('hr-director')
@ApiTags('hr-director')
export class HrDirectorController {
  constructor(private readonly hrDirectorService: HrDirectorService) {}

  @Post()
  async create(
    @Body() createDepartementDto: CreateHrDirectorDto,
    @Res() response,
  ) {
    const newHD = await this.hrDirectorService.create(createDepartementDto);
    try {
      return response.status(HttpStatus.ACCEPTED).json({
        data: newHD,
        status: 200,
        message: 'Created',
      });
    } catch (error) {
      response.status(HttpStatus.ACCEPTED).json({
        status: 404,
        message: 'error to create',
      });
    }
  }

  @Get()
  findAll() {
    return this.hrDirectorService.findAll();
  }

  // @Get(':id')
  // async findOne(
  //   @Param('id') id: string,
  //   @Res() response,
  // ): Promise<Ihrdirector> {
  //   const depfind = await this.hrDirectorService.findOne(id);
  //   try {
  //     return response.status(HttpStatus.ACCEPTED).json({
  //       status: 200,
  //       message: 'user founed',
  //       data: depfind,
  //     });
  //   } catch (error) {
  //     response.status(HttpStatus.BAD_REQUEST).json({
  //       status: 500,
  //       message: 'user is not founed',
  //     });
  //   }
  // }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    //type: Number
    type: String,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateHrDirectorDto,
    @Res() response,
  ) {
    // return this.userService.update(id, updateUserDto);
    const userUpdated = this.hrDirectorService.update(id, updateDepartmentDto);
    try {
      return response.status(HttpStatus.ACCEPTED).json({
        message: 'update succesfull',
        status: 200,
        data: userUpdated,
      });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'probleme to remove',
        status: 500,
      });
    }
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    //type: Number
    type: String,
  })
  @Delete(':id')
  eddace(@Param('id') id: string, @Res() response) {
    // return this.userService.remove(id);
    try {
      this.hrDirectorService.remove(id);
      response.status(HttpStatus.ACCEPTED).json({
        message: 'succes to remove',
        status: 200,
      });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'probleme to remove',
        status: 500,
      });
    }
  }


  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    //type: Number
    type: String,
  })

  @Get('res:id')
  async res( @Param('id') id: string, @Res() response): Promise<ISallon> {
    console.log('id*********',id)
    const depfind = await this.hrDirectorService.reservation(id);
    try {
      return response.status(HttpStatus.ACCEPTED).json({
        status: 200,
        message: 'user founed',
        data: depfind,
      });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({
        status: 500,
        message: 'user is not founed',
      });
    }
  }



}

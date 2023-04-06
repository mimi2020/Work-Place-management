import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SallonService } from './sallon.service';
import { CreateSallonDto } from './dto/create-sallon.dto';
import { UpdateSallonDto } from './dto/update-sallon.dto';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('sallon')
@ApiTags('sallon')
export class SallonController {
  constructor(private readonly sallonService: SallonService) {}

  @Post()
  async create(@Body() createSallonDto: CreateSallonDto) {
    return await this.sallonService.create(createSallonDto);
  }

  @Get()
  findAll() {
    return this.sallonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sallonService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSallonDto: UpdateSallonDto) {
    return this.sallonService.update(id, updateSallonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sallonService.remove(id);
  }
}

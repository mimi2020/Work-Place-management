import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { IPresence } from './interface/presence.interface';

@Controller('presence')
@ApiTags('presence')
export class PresenceController {
  constructor(private readonly presenceService: PresenceService) {}

  @Post()
  async create(
    @Body() createPresenceDto: CreatePresenceDto,
  ): Promise<IPresence> {
    return await this.presenceService.create(createPresenceDto);
  }

  @Get()
  findAll() {
    return this.presenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.presenceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePresenceDto: UpdatePresenceDto,
  ) {
    return this.presenceService.update(id, updatePresenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.presenceService.remove(id);
  }
}

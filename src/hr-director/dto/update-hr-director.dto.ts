import { PartialType } from '@nestjs/swagger';
import { CreateHrDirectorDto } from './create-hr-director.dto';

export class UpdateHrDirectorDto extends PartialType(CreateHrDirectorDto) {}

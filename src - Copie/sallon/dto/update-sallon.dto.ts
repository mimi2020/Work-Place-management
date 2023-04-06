import { PartialType } from '@nestjs/swagger';
import { CreateSallonDto } from './create-sallon.dto';

export class UpdateSallonDto extends PartialType(CreateSallonDto) {}

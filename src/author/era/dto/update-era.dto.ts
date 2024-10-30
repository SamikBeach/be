import { PartialType } from '@nestjs/swagger';
import { CreateEraDto } from './create-era.dto';

export class UpdateEraDto extends PartialType(CreateEraDto) {}

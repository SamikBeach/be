import { PartialType } from '@nestjs/mapped-types';
import { CreateEraDto } from './create-era.dto';

export class UpdateEraDto extends PartialType(CreateEraDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateEditionLikeDto } from './create-edition_like.dto';

export class UpdateEditionLikeDto extends PartialType(CreateEditionLikeDto) {}

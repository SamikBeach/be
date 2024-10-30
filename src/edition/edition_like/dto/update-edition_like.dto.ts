import { PartialType } from '@nestjs/swagger';
import { CreateEditionLikeDto } from './create-edition_like.dto';

export class UpdateEditionLikeDto extends PartialType(CreateEditionLikeDto) {}

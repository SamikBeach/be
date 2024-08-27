import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorLikeDto } from './create-author_like.dto';

export class UpdateAuthorLikeDto extends PartialType(CreateAuthorLikeDto) {}

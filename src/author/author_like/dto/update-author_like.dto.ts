import { PartialType } from '@nestjs/swagger';
import { CreateAuthorLikeDto } from './create-author_like.dto';

export class UpdateAuthorLikeDto extends PartialType(CreateAuthorLikeDto) {}

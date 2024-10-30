import { PartialType } from '@nestjs/swagger';
import { CreateOriginalWorkLikeDto } from './create-original_work_like.dto';

export class UpdateOriginalWorkLikeDto extends PartialType(
  CreateOriginalWorkLikeDto
) {}

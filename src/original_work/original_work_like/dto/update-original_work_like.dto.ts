import { PartialType } from '@nestjs/mapped-types';
import { CreateOriginalWorkLikeDto } from './create-original_work_like.dto';

export class UpdateOriginalWorkLikeDto extends PartialType(CreateOriginalWorkLikeDto) {}

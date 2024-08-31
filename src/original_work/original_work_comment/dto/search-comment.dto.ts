import { BasePaginationDto } from '@common/dto/base-pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export type OriginalWorkCommentSort = 'top_likes' | 'top_comments' | 'latest';

export class SearchOriginalWorkCommentsDto extends BasePaginationDto {
  @IsOptional()
  @IsString()
  sort: OriginalWorkCommentSort;
}

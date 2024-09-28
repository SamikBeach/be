import { BasePaginationDto } from '@common/dto/base-pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export type EditionCommentSort = 'top_likes' | 'top_comments' | 'latest';

export class SearchEditionCommentsDto extends BasePaginationDto {
  @IsOptional()
  @IsString()
  sort: EditionCommentSort;
}

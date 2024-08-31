import { BasePaginationDto } from '@common/dto/base-pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export type AuthorCommentSort = 'top_likes' | 'top_comments' | 'latest';

export class SearchAuthorCommentsDto extends BasePaginationDto {
  @IsOptional()
  @IsString()
  sort: AuthorCommentSort;
}

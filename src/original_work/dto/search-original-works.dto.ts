import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginateOriginalWorkDto } from './paginate-original-work.dto';

export type OriginalWorkSort =
  | 'trending'
  | 'top_likes'
  | 'top_comments'
  | 'publication_date'
  | 'alphabetical';

export class SearchOriginalWorksDto extends PaginateOriginalWorkDto {
  @IsOptional()
  @IsString()
  sort?: OriginalWorkSort;

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsNumber()
  authorId?: number;
}

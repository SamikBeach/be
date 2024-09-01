import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginateOriginalWorkDto } from './paginate-original-work.dto';

export type OriginalWorkSort =
  | 'top_likes'
  | 'top_comments'
  | 'publication_date_newest'
  | 'publication_date_oldest'
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

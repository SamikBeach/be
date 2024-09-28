import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginateEditionDto } from './paginate-edition.dto';

export type EditionSort =
  | 'top_likes'
  | 'top_comments'
  | 'publication_date_newest'
  | 'publication_date_oldest'
  | 'alphabetical';

export class SearchEditionsDto extends PaginateEditionDto {
  @IsOptional()
  @IsString()
  sort?: EditionSort;

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsNumber()
  authorId?: number;
}

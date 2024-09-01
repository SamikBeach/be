import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginateAuthorDto } from './paginate-author.dto';

export type AuthorSort =
  | 'top_likes'
  | 'top_comments'
  | 'birth_date'
  | 'death_date'
  | 'alphabetical';

export class SearchAuthorsDto extends PaginateAuthorDto {
  @IsOptional()
  @IsString()
  sort: AuthorSort;

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsNumber()
  eraId?: number;
}

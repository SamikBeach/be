import { IsArray, IsOptional } from 'class-validator';
import { PaginateBookDto } from './paginate-book.dto';

export class SearchBooksDto extends PaginateBookDto {
  @IsOptional()
  @IsArray()
  authorIds: number[];

  @IsOptional()
  @IsArray()
  writingIds: number[];
}

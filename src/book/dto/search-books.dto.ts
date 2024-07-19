import { IsNumber, IsOptional } from 'class-validator';
import { PaginateBookDto } from './paginate-book.dto';

export class SearchBooksDto extends PaginateBookDto {
  @IsOptional()
  @IsNumber()
  authorId: number;
}

import { IsNumber, IsOptional } from 'class-validator';
import { PaginateWritingDto } from './paginate-writing.dto';

export class SearchWritingsDto extends PaginateWritingDto {
  @IsOptional()
  @IsNumber()
  authorId: number;
}

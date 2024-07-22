import { IsArray, IsOptional } from 'class-validator';
import { PaginateWritingDto } from './paginate-writing.dto';

export class SearchWritingsDto extends PaginateWritingDto {
  @IsOptional()
  @IsArray()
  authorIds: number[];

  @IsOptional()
  @IsArray()
  sort: { type: string; direction: 'ASC' | 'DESC' }[];
}

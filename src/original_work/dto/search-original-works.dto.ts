import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginateOriginalWorkDto } from './paginate-original-work.dto';

export class SearchOriginalWorksDto extends PaginateOriginalWorkDto {
  @IsOptional()
  @IsNumber()
  authorId: number;

  // @IsOptional()
  // @IsArray()
  // sort: { type: string; direction: 'ASC' | 'DESC' }[];

  @IsOptional()
  @IsString()
  keyword: string;
}

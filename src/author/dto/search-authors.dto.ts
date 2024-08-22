import { IsOptional, IsString } from 'class-validator';
import { PaginateAuthorDto } from './paginate-author.dto';

export class SearchAuthorsDto extends PaginateAuthorDto {
  // @IsOptional()
  // @IsArray()
  // sort: { type: string; direction: 'ASC' | 'DESC' }[];

  @IsOptional()
  @IsString()
  keyword: string;
}

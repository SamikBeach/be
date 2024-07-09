import { IsArray, IsOptional } from 'class-validator';
import { PaginateAuthorDto } from './paginate-author.dto';

export class SearchAuthorDto extends PaginateAuthorDto {
  @IsArray()
  @IsOptional()
  nationalityIds: number[];

  @IsArray()
  @IsOptional()
  eraIds: number[];

  @IsArray()
  @IsOptional()
  regionIds: number[];

  @IsArray()
  @IsOptional()
  mainInterestIds: number[];

  @IsArray()
  @IsOptional()
  schoolIds: number[];

  @IsArray()
  @IsOptional()
  educationIds: number[];
}

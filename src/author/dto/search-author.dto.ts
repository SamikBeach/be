import { IsNumber, IsOptional } from 'class-validator';
import { PaginateAuthorDto } from './paginate-author.dto';

export class SearchAuthorDto extends PaginateAuthorDto {
  @IsNumber()
  @IsOptional()
  nationalityId: number;

  @IsNumber()
  @IsOptional()
  eraId: number;

  @IsNumber()
  @IsOptional()
  regionId: number;

  @IsNumber()
  @IsOptional()
  mainInterestId: number;

  @IsNumber()
  @IsOptional()
  schoolId: number;

  @IsNumber()
  @IsOptional()
  educationId: number;
}

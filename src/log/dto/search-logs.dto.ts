import { BasePaginationDto } from '@common/dto/base-pagination.dto';
import { OmitType } from '@nestjs/mapped-types';

export class SearchLogsDto extends OmitType(BasePaginationDto, [
  'order__name',
]) {}

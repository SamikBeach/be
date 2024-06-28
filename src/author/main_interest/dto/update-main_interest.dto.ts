import { PartialType } from '@nestjs/mapped-types';
import { CreateMainInterestDto } from './create-main_interest.dto';

export class UpdateMainInterestDto extends PartialType(CreateMainInterestDto) {}

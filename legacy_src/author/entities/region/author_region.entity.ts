import { Entity, PrimaryColumn } from 'typeorm';

@Entity('author_region')
export class AuthorRegionModel {
  @PrimaryColumn()
  author_id: number;

  region_id: number;
}

import { Entity, PrimaryColumn } from 'typeorm';

@Entity('author_era')
export class AuthorEraModel {
  @PrimaryColumn()
  author_id: number;

  era_id: number;
}

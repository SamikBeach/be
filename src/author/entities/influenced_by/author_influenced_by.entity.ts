import { Entity, PrimaryColumn } from 'typeorm';

@Entity('author_influenced_by')
export class AuthorInfluencedByModel {
  @PrimaryColumn()
  author_id: number;

  influenced_by_author_id: number;
}

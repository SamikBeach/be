import { Entity, PrimaryColumn } from 'typeorm';

@Entity('author_influenced')
export class AuthorInfluencedModel {
  @PrimaryColumn()
  author_id: number;

  influenced_author_id: number;
}

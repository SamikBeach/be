import { Entity, PrimaryColumn } from 'typeorm';

@Entity('author_education')
export class AuthorEducationModel {
  @PrimaryColumn()
  author_id: number;

  education_id: number;
}

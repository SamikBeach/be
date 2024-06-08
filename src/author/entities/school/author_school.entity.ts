import { Entity, PrimaryColumn } from 'typeorm';

@Entity('author_school')
export class AuthorSchoolModel {
  @PrimaryColumn()
  author_id: number;

  school_id: number;
}

import { Entity, PrimaryColumn } from 'typeorm';

@Entity('author_main_interest')
export class AuthorMainInterestModel {
  @PrimaryColumn()
  author_id: number;

  main_interest_id: number;
}

import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('author_book')
export class AuthorBookModel {
  @PrimaryColumn()
  author_id: number;

  @Column()
  book_id: number;
}

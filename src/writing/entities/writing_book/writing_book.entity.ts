import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('writing_book')
export class WritingBookModel {
  @PrimaryColumn()
  writing_id: number;

  @Column()
  book_id: number;
}

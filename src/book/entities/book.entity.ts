import { AuthorModel } from 'src/author/entities/author.entity';
import { WritingModel } from 'src/writing/entities/writing.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Book')
export class BookModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isbn: string;

  @ManyToMany(() => AuthorModel)
  @JoinTable({
    name: 'author_book',
    joinColumn: { name: 'book_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'author_id',
      referencedColumnName: 'id',
    },
  })
  authors: AuthorModel[];

  @ManyToMany(() => WritingModel)
  @JoinTable({
    name: 'writing_book',
    joinColumn: { name: 'book_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'writing_id',
      referencedColumnName: 'id',
    },
  })
  writings: WritingModel[];
}

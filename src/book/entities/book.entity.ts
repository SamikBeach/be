import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Book')
export class BookModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isbn: string;
}

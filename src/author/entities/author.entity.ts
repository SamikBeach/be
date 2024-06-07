import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Author')
export class AuthorModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  name_in_kor: string;

  @Column()
  image_url: string;

  @Column()
  born_date: string;

  @Column()
  born_date_is_bc: number;

  @Column()
  died_date: string;

  @Column()
  died_date_is_bc: number;

  @Column()
  nationality_id: number;
}

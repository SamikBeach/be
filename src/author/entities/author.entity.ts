import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NationalityModel } from './nationality.entity';
import { WritingModel } from 'src/writing/entities/writing.entity';
import { EducationModel } from './education.entity';

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

  @ManyToOne(() => NationalityModel)
  @JoinColumn({ name: 'nationality_id' })
  nationality: NationalityModel;

  @OneToMany(() => WritingModel, writing => writing.author)
  writing: WritingModel[];

  @ManyToMany(() => EducationModel)
  @JoinTable({
    name: 'author_education',
    joinColumn: { name: 'author_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'education_id', referencedColumnName: 'id' },
  })
  education: EducationModel[];
}

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
import { NationalityModel } from './nationality/nationality.entity';
import { WritingModel } from 'src/writing/entities/writing.entity';
import { EducationModel } from './education/education.entity';
import { EraModel } from '../era/entities/era.entity';
import { RegionModel } from './region/region.entity';
import { SchoolModel } from './school/school.entity';
import { MainInterestModel } from './main_interests/main_interest.entity';
import { BookModel } from 'src/book/entities/book.entity';

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

  @ManyToMany(() => EraModel)
  @JoinTable({
    name: 'author_era',
    joinColumn: { name: 'author_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'era_id', referencedColumnName: 'id' },
  })
  era: EraModel[];

  @ManyToMany(() => RegionModel)
  @JoinTable({
    name: 'author_region',
    joinColumn: { name: 'author_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'region_id', referencedColumnName: 'id' },
  })
  region: RegionModel[];

  @ManyToMany(() => SchoolModel)
  @JoinTable({
    name: 'author_school',
    joinColumn: { name: 'author_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'school_id', referencedColumnName: 'id' },
  })
  school: SchoolModel[];

  @ManyToMany(() => MainInterestModel)
  @JoinTable({
    name: 'author_main_interest',
    joinColumn: { name: 'author_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'main_interest_id', referencedColumnName: 'id' },
  })
  main_interest: MainInterestModel[];

  @ManyToMany(() => AuthorModel)
  @JoinTable({
    name: 'author_influenced',
    joinColumn: { name: 'author_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'influenced_author_id',
      referencedColumnName: 'id',
    },
  })
  influenced: AuthorModel[];

  @ManyToMany(() => AuthorModel)
  @JoinTable({
    name: 'author_influenced_by',
    joinColumn: { name: 'author_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'influenced_by_author_id',
      referencedColumnName: 'id',
    },
  })
  influenced_by: AuthorModel[];

  @ManyToMany(() => BookModel)
  @JoinTable({
    name: 'author_book',
    joinColumn: { name: 'author_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'book_id',
      referencedColumnName: 'id',
    },
  })
  book: BookModel[];
}

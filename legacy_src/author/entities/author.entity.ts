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
import { NationalityModel } from '../nationality/entities/nationality.entity';
import { EducationModel } from '../education/entities/education.entity';
import { EraModel } from '../era/entities/era.entity';
import { RegionModel } from '../region/entities/region.entity';
import { SchoolModel } from '../school/entities/school.entity';
import { MainInterestModel } from '../main_interest/entities/main_interest.entity';
import { WritingModel } from '@writing/entities/original_work.entity';
import { BookModel } from '@book/entities/book.entity';

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
  writings: WritingModel[];

  @ManyToMany(() => EducationModel)
  @JoinTable({
    name: 'author_education',
    joinColumn: { name: 'author_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'education_id', referencedColumnName: 'id' },
  })
  educations: EducationModel[];

  @ManyToMany(() => EraModel)
  @JoinTable({
    name: 'author_era',
    joinColumn: { name: 'author_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'era_id', referencedColumnName: 'id' },
  })
  eras: EraModel[];

  @ManyToMany(() => RegionModel)
  @JoinTable({
    name: 'author_region',
    joinColumn: { name: 'author_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'region_id', referencedColumnName: 'id' },
  })
  regions: RegionModel[];

  @ManyToMany(() => SchoolModel)
  @JoinTable({
    name: 'author_school',
    joinColumn: { name: 'author_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'school_id', referencedColumnName: 'id' },
  })
  schools: SchoolModel[];

  @ManyToMany(() => MainInterestModel)
  @JoinTable({
    name: 'author_main_interest',
    joinColumn: { name: 'author_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'main_interest_id', referencedColumnName: 'id' },
  })
  main_interests: MainInterestModel[];

  @ManyToMany(() => AuthorModel)
  @JoinTable({
    name: 'author_influenced',
    joinColumn: { name: 'author_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'influenced_author_id',
      referencedColumnName: 'id',
    },
  })
  influenceds: AuthorModel[];

  @ManyToMany(() => AuthorModel)
  @JoinTable({
    name: 'author_influenced_by',
    joinColumn: { name: 'author_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'influenced_by_author_id',
      referencedColumnName: 'id',
    },
  })
  influenced_bys: AuthorModel[];

  @ManyToMany(() => BookModel)
  @JoinTable({
    name: 'author_book',
    joinColumn: { name: 'author_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'book_id',
      referencedColumnName: 'id',
    },
  })
  books: BookModel[];
}

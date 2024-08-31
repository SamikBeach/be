import { AuthorModel } from '@author/entities/author.entity';
import { BaseModel } from '@common/entities/base.entity';
import { OriginalWorkModel } from '@original_work/entities/original_work.entity';
import { IsEmail, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('User')
export class UserModel extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  name: string;

  @ManyToMany(() => AuthorModel)
  @JoinTable({
    name: 'author_like',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'author_id', referencedColumnName: 'id' },
  })
  liked_authors: AuthorModel[];

  @ManyToMany(() => OriginalWorkModel)
  @JoinTable({
    name: 'original_work_like',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'original_work_id', referencedColumnName: 'id' },
  })
  liked_original_works: OriginalWorkModel[];

  @CreateDateColumn()
  created_at: Date = new Date();

  @UpdateDateColumn()
  updated_at: Date = new Date();
}

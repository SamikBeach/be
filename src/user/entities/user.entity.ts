import { AuthorModel } from '@author/entities/author.entity';
import { BaseModel } from '@common/entities/base.entity';
import { EditionModel } from '@edition/entities/edition.entity';
import { ApiProperty } from '@nestjs/swagger';
import { OriginalWorkModel } from '@original_work/entities/original_work.entity';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
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
  @IsOptional()
  name?: string;

  @Column()
  @IsString()
  @IsOptional()
  nickname?: string;

  @Column()
  @IsString()
  @IsOptional()
  password?: string;

  @Column()
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: '이메일로 발송된 6자리 인증 코드',
    example: '123456',
  })
  verification_code?: number;

  @Column()
  @IsBoolean()
  verified: boolean;

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

  @ManyToMany(() => EditionModel)
  @JoinTable({
    name: 'edition_like',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'edition_id', referencedColumnName: 'id' },
  })
  liked_editions: EditionModel[];

  @ManyToMany(() => AuthorModel)
  @JoinTable({
    name: 'author_comment',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'author_id',
      referencedColumnName: 'id',
    },
  })
  commented_authors: AuthorModel[];

  @ManyToMany(() => OriginalWorkModel)
  @JoinTable({
    name: 'original_work_comment',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'original_work_id',
      referencedColumnName: 'id',
    },
  })
  commented_original_works: OriginalWorkModel[];

  @ManyToMany(() => EditionModel)
  @JoinTable({
    name: 'edition_comment',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'edition_id',
      referencedColumnName: 'id',
    },
  })
  commented_editions: EditionModel[];

  @CreateDateColumn()
  created_at: Date = new Date();

  @UpdateDateColumn()
  updated_at: Date = new Date();
}

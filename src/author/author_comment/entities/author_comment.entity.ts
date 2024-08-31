import { AuthorModel } from '@author/entities/author.entity';
import { UserModel } from '@user/entities/user.entity';
import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('author_comment')
export class AuthorCommentModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @Column()
  @IsString()
  comment: string;

  @Column()
  @IsNumber()
  author_id: number;

  @ManyToOne(() => AuthorModel)
  @JoinColumn({ name: 'author_id' })
  author: AuthorModel;

  @Column()
  target_comment_id?: number;

  @Column()
  target_user_id?: number;

  @Column()
  @IsNumber()
  like_count: number = 0;

  @Column()
  @IsNumber()
  comment_count: number = 0;

  @CreateDateColumn()
  created_at: Date = new Date();

  @UpdateDateColumn()
  updated_at: Date = new Date();

  @OneToMany(() => AuthorCommentModel, comment => comment.target_comment_id)
  sub_comments: AuthorCommentModel[];

  @ManyToMany(() => UserModel)
  @JoinTable({
    name: 'author_comment_like',
    joinColumn: { name: 'author_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  liked_users: UserModel[];
}

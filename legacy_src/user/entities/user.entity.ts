import { BaseModel } from '@common/entities/base.entity';
import { IsEmail, IsString, Length } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity('User')
export class UserModel extends BaseModel {
  @Column({
    unique: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @Length(3, 12)
  password: string;
}

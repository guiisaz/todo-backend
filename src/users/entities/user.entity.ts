import {
  Table,
  Model,
  Column,
  BeforeUpdate,
  BeforeCreate,
  HasMany,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Todo } from 'src/todo/entities/todo.entity';

@Table({
  tableName: 'users',
  underscored: true,
})
export class User extends Model {
  @Column
  name: string;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column
  password: string;

  @Column
  token: string;

  @Column
  isAdmin: boolean;

  @HasMany(() => Todo)
  todo: Todo;

  @BeforeUpdate
  @BeforeCreate
  static hashPassword(user: User) {
    if (user.previous('password') !== user.password) {
      user.password = bcrypt.hashSync(user.password, 10);
    }
  }
}


export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}
import { ApiProperty } from '@nestjs/swagger';

import {
  Table,
  Model,
  Column,
  DataType,
  HasOne,
  BelongsToMany,
} from 'sequelize-typescript';
import { Roles } from 'src/roles/roles.model';
import { UserRole } from 'src/roles/user-role.model';
import { UserDescription } from 'src/user-description/user-description.model';

export interface UserCreationAttr {
  id: number;
  login: string;
  password: string;
  banned: boolean;
}

@Table({ tableName: 'users', paranoid: true })
export class User extends Model<User, UserCreationAttr> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'admin', description: 'Логин' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @ApiProperty({ example: 'admin', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'true', description: 'Ban' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: string;

  @ApiProperty({ example: '12.12.2022', description: 'Дата' })
  @Column({ type: DataType.DATE })
  deletedAt!: Date;

  @BelongsToMany(() => Roles, () => UserRole)
  roles: Roles[];

  @HasOne(() => UserDescription)
  userDescription: UserDescription;
}

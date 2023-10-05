import { ApiProperty } from '@nestjs/swagger';

import {
  AfterDestroy,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Roles } from 'src/roles/roles.model';
import { UserRole } from 'src/roles/user-role.model';
import { ScopeWork } from 'src/scope-work/scope-work.model';
import { UserScopeWork } from 'src/scope-work/user-scope-work.model';
import { TableAddingData } from 'src/table-adding-data/table-adding-data.model';
import { UserDescription } from 'src/user-description/user-description.model';

export interface UserCreationAttr {
  id: number;
  email: string;
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

  @ApiProperty({ example: 'email@email.ru', description: 'Email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

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

  @BelongsToMany(() => ScopeWork, () => UserScopeWork)
  scopeWork: ScopeWork[];

  @HasMany(() => TableAddingData)
  tableAddingData: TableAddingData[];

  @AfterDestroy
  static async deleteDescription(user: User) {
    if (user.userDescription) {
      await UserDescription.destroy({ where: { userId: user.id } });
    }
  }
}

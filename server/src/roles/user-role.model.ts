// import { ApiProperty } from '@nestjs/swagger';
// import {
//   Column,
//   DataType,
//   ForeignKey,
//   Model,
//   Table,
// } from 'sequelize-typescript';
// import { User } from 'src/user/user.model';
// import { Roles } from './roles.model';

// @Table({ tableName: 'user_role' })
// export class UserRole extends Model<UserRole> {
//   @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
//   @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
//   id: number;

//   @ForeignKey(() => User)
//   @Column({ type: DataType.INTEGER })
//   userId: number;

//   @ForeignKey(() => Roles)
//   @Column({ type: DataType.INTEGER })
//   roleId: number;
// }

// import { ApiProperty } from '@nestjs/swagger';
// import {
//   BelongsToMany,
//   Column,
//   DataType,
//   Model,
//   Table,
// } from 'sequelize-typescript';
// import { User } from 'src/user/user.model';
// import { UserRole } from './user-role.model';

// interface RoleCreationAttr {
//   name: string;
//   description: string;
// }

// @Table({ tableName: 'roles', paranoid: true })
// export class Roles extends Model<Roles, RoleCreationAttr> {
//   @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
//   @Column({
//     type: DataType.INTEGER,
//     unique: true,
//     primaryKey: true,
//     autoIncrement: true,
//   })
//   id: number;

//   @ApiProperty({ example: 'admin', description: 'Наименование роли' })
//   @Column({ type: DataType.STRING, unique: true, allowNull: false })
//   name: string;

//   @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
//   @Column({ type: DataType.STRING, allowNull: false })
//   description: string;

//   @ApiProperty({ example: '12.12.2022', description: 'Дата' })
//   @Column({ type: DataType.DATE })
//   deletedAt!: Date;

//   @BelongsToMany(() => User, () => UserRole)
//   users: User[];
// }

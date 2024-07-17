// import { ApiProperty } from '@nestjs/swagger';
// import {
//   Column,
//   DataType,
//   ForeignKey,
//   Model,
//   Table,
// } from 'sequelize-typescript';
// import { User } from 'src/user/user.model';

// interface UserDescriptionAttr {
//   id: number;
//   firstname: string;
//   lastname: string;
// }

// @Table({ tableName: 'user-description', paranoid: true })
// export class UserDescription extends Model<
//   UserDescription,
//   UserDescriptionAttr
// > {
//   @ApiProperty({ example: '1', description: 'Идентификатор' })
//   @Column({
//     type: DataType.INTEGER,
//     unique: true,
//     autoIncrement: true,
//     primaryKey: true,
//   })
//   id: number;

//   @ApiProperty({ example: 'Иван', description: 'Имя' })
//   @Column({ type: DataType.STRING, allowNull: true })
//   firstname: string;

//   @Column({ type: DataType.DATE })
//   deletedAt!: Date;

//   @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
//   @Column({ type: DataType.STRING, allowNull: true })
//   lastname: string;

//   @ForeignKey(() => User)
//   userId: number;
// }

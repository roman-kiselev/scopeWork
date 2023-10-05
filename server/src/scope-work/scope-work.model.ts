import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ListNameWork } from 'src/list-name-work/list-name-work.model';
import { Objects } from 'src/objects/objects.model';
import { TableAddingData } from 'src/table-adding-data/table-adding-data.model';
import { TypeWork } from 'src/type-work/type-work.model';
import { User } from 'src/user/user.model';
import { UserScopeWork } from './user-scope-work.model';

// interface ScopeWorkAttr {
//   number: number;
// }

@Table({ tableName: 'scope_work', paranoid: true })
export class ScopeWork extends Model<ScopeWork> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  // @ApiProperty({ example: '100', description: 'Порядковый номер' })
  // @Column({
  //   type: DataType.INTEGER,
  //   unique: true,
  // })
  // number: number;

  @Column({ type: DataType.DATE })
  deletedAt!: Date;

  @ForeignKey(() => TypeWork)
  @Column({ type: DataType.INTEGER })
  typeWorkId: number;

  @ForeignKey(() => Objects)
  @Column({ type: DataType.INTEGER })
  objectId: number;

  @HasMany(() => ListNameWork)
  listNameWork: ListNameWork[];

  @BelongsToMany(() => User, () => UserScopeWork)
  users: User[];

  @HasMany(() => TableAddingData)
  tableAddingData: TableAddingData[];
}

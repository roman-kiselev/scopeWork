import { ApiProperty } from '@nestjs/swagger';
import { ModelAttributeColumnOptions } from 'sequelize';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ListNameWork } from 'src/list-name-work/list-name-work.model';
import { NameWork } from 'src/name-work/name-work.model';

interface NameListAttr {
  quntity: number;
  listNameWorkId: number;
  nameWorkId: number;
}

@Table({ tableName: 'name-list', paranoid: true })
export class NameList
  extends Model<NameList, NameListAttr>
  implements NameListAttr
{
  @ApiProperty({ example: 6, description: 'Количество товарв' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  } as ModelAttributeColumnOptions)
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  quntity: number;

  @ForeignKey(() => ListNameWork)
  listNameWorkId: number;

  @ForeignKey(() => NameWork)
  nameWorkId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { ModelAttributeColumnOptions } from 'sequelize';
import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { NameWork } from 'src/name-work/name-work.model';
import { NameList } from 'src/name_list/name-list.model';
import { ScopeWork } from 'src/scope-work/scope-work.model';
import { TypeWork } from 'src/type-work/type-work.model';

interface ListNameWorkAttr {
  name?: string;
  description?: string;
  typeWorkId?: number;
  scopeWorkId?: number;
}

@Table({ tableName: 'list_name_work', paranoid: true })
export class ListNameWork extends Model<ListNameWork, ListNameWorkAttr> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  } as ModelAttributeColumnOptions)
  id: number;

  @ApiProperty({ example: 'Лист 1', description: 'Наименование' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  } as ModelAttributeColumnOptions)
  name?: string;

  @ApiProperty({
    example: 'Для такого то объета',
    description: 'Описание списка',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  } as ModelAttributeColumnOptions)
  description?: string;

  @Column({
    type: DataType.DATE,
  } as ModelAttributeColumnOptions)
  deletedAt!: Date;

  @ForeignKey(() => TypeWork)
  typeWorkId: number;

  @BelongsToMany(() => NameWork, () => NameList)
  nameWorks: NameWork[];

  @ForeignKey(() => ScopeWork)
  scopeWorkId: number;
}

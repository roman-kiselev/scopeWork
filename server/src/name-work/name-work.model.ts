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
import { NameList } from 'src/name_list/name-list.model';
import { TableAddingData } from 'src/table-adding-data/table-adding-data.model';
import { TypeWork } from 'src/type-work/type-work.model';
import { Unit } from 'src/unit/unit.model';
import { NameWorkTypeWork } from './name-work-typework';

interface NameWorkAttr {
  id: number;
  name: string;
  unitId: number;
  typeWork: number;
}

@Table({ tableName: 'name_work', paranoid: true })
export class NameWork extends Model<NameWork, NameWorkAttr> {
  @ApiProperty({ example: '1', description: 'id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Товар', description: 'Товар' })
  @Column({
    type: DataType.TEXT,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.DATE,
  })
  deletedAt?: Date;

  @ForeignKey(() => Unit)
  unitId: number;

  // @HasMany(() => TotalVolume)
  // totalVolume: TotalVolume[];

  @HasMany(() => TableAddingData)
  tableAddingData: TableAddingData[];

  @BelongsToMany(() => TypeWork, () => NameWorkTypeWork)
  typeWorks: TypeWork[];

  @BelongsToMany(() => ListNameWork, () => NameList)
  listNameWorks: ListNameWork[];
}

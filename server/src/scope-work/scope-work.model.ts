import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ObjectTypeWork } from 'src/objects/objects-type_work.model';
import { TotalVolume } from 'src/total-volume/total-volume.model';

interface ScopeWorkAttr {
  // value?: number;
  objectTypeWorkId: number;
}

@Table({ tableName: 'scope_work' })
export class ScopeWork extends Model<ScopeWork, ScopeWorkAttr> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '100', description: 'Порядковый номер' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
  })
  value: number;

  @Column({ type: DataType.DATE })
  deletedAt!: Date;

  @ForeignKey(() => ObjectTypeWork)
  @Column({ type: DataType.INTEGER })
  objectTypeWorkId: number;

  @HasMany(() => TotalVolume)
  totalVolume: TotalVolume[];
  // @BeforeCreate
  // static setFieldValue(instance: ScopeWork) {
  //   console.log(instance);
  //   instance.value = instance.id;
  // }
}

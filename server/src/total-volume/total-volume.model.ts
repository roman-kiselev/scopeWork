import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { NameWork } from 'src/name-work/name-work.model';
import { ScopeWork } from 'src/scope-work/scope-work.model';

interface TotalVolumeAttr {
  number: number;
  quntity: number;
  nameWorkId: number;
  scopeWorkId: number;
}

@Table({ tableName: 'total_volume', paranoid: true })
export class TotalVolume extends Model<TotalVolume, TotalVolumeAttr> {
  @ApiProperty({ example: '1', description: 'Идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '3', description: 'Порядковый номер' })
  @Column({
    type: DataType.INTEGER,
  })
  number: number;

  @ApiProperty({ example: '100', description: 'Количество' })
  @Column({
    type: DataType.INTEGER,
  })
  quntity: number;

  @ForeignKey(() => NameWork)
  nameWorkId: number;

  @ForeignKey(() => ScopeWork)
  scopeWorkId: number;
}

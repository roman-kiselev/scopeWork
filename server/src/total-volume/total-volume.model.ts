import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface TotalVolumeAttr {
  number: number;
  quantity: number;
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
    autoIncrement: true,
  })
  number: number;

  @ApiProperty({ example: '100', description: 'Порядковый номер' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  quantity: number;

  @Column({
    type: DataType.DATE,
  })
  deletedAt: Date;
}

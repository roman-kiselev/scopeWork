import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ListWorkAttr {
  id: number;
  number: number;
  nameWorkId: number;
  quntity: number;
}

@Table({ tableName: 'list_work', paranoid: true })
export class ListWork extends Model<ListWork, ListWorkAttr> {
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
  quntity: number;

  @Column({
    type: DataType.DATE,
  })
  deletedAt: Date;
}

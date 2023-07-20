import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Unit } from 'src/unit/unit.model';

interface NameWorkAttr {
  id: number;
  name: string;
  unitId: number;
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
    type: DataType.STRING,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.DATE,
  })
  deletedAt?: Date;

  @ForeignKey(() => Unit)
  unitId: number;
}

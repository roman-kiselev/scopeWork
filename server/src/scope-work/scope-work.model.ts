import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ScopeWorkAttr {
  value: number;
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
}

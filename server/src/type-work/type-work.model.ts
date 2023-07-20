import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Objects } from 'src/objects/objects.model';

interface TypeWorkAttr {
  id: number;
  name: string;
  description: string;
  deletedAt?: Date;
}

@Table({ tableName: 'type_work' })
export class TypeWork extends Model<TypeWork, TypeWorkAttr> {
  @ApiProperty({ example: '1', description: 'Идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'АСКУЭ', description: 'Название' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 'Работы', description: 'Описание' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({ example: '12.01.2099', description: 'Дата' })
  @Column({ type: DataType.DATE })
  deletedAt!: Date;

  @BelongsToMany(() => TypeWork, () => Objects)
  objects: Objects[];
}

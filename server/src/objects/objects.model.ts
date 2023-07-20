import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { TypeWork } from 'src/type-work/type-work.model';

interface ObjectsAttr {
  id: number;
  name: string;
  address: string;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
}

@Table({ tableName: 'objects' })
export class Objects extends Model<Objects, ObjectsAttr> {
  @ApiProperty({ example: '1', description: 'Идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'Зеландия', description: 'Название' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @ApiProperty({ example: 'г. Москва', description: 'Адрес' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;
  @ApiProperty({ example: '12.01.2099', description: 'Дата' })
  @Column({ type: DataType.DATE })
  deletedAt!: Date;

  @BelongsToMany(() => Objects, () => TypeWork)
  typeWorks: TypeWork[];
}

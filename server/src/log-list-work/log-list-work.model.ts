import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ListWork } from 'src/list-work/list-work.model';
import { Objects } from 'src/objects/objects.model';
import { User } from 'src/user/user.model';

interface LogListWorkAttr {
  id: number;
  value: string;
}

@Table({ tableName: 'log_list_work', paranoid: true })
export class LogListWork extends Model<LogListWork, LogListWorkAttr> {
  @ApiProperty({ example: '1', description: 'Идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Text', description: 'desc' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  value: number;

  @ForeignKey(() => Objects)
  objectId: number;

  @ForeignKey(() => User)
  userId: number;

  @ForeignKey(() => ListWork)
  listWorkId: number;
}

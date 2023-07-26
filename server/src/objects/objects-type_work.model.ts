import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ScopeWork } from 'src/scope-work/scope-work.model';
import { TypeWork } from 'src/type-work/type-work.model';
import { Objects } from './objects.model';

@Table({ tableName: 'obj_type_work' })
export class ObjectTypeWork extends Model<ObjectTypeWork> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Objects)
  objectId: number;

  @ForeignKey(() => TypeWork)
  typeWorkId: number;

  @HasMany(() => ScopeWork)
  scopeWorks: ScopeWork[];
}

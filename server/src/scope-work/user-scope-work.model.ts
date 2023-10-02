import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { ScopeWork } from './scope-work.model';

@Table({ tableName: 'user-scope-work' })
export class UserScopeWork extends Model<UserScopeWork> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @ForeignKey(() => User)
  userId: number;

  @ForeignKey(() => ScopeWork)
  scopeWorkId: number;
}

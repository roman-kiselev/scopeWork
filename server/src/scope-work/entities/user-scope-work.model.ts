import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { ScopeWork } from './scope-work.model';

interface UserScopeWorkAttr {
    userId: number;
    scopeWorkId: number;
}
@Table({ tableName: 'user-scope-work' })
export class UserScopeWork extends Model<UserScopeWork, UserScopeWorkAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    })
    id: number;

    // @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @ForeignKey(() => ScopeWork)
    scopeWorkId: number;
}

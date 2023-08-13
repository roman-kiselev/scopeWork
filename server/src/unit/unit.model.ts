import {ApiProperty} from '@nestjs/swagger';
import {Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {NameWork} from 'src/name-work/name-work.model';

interface UnitAttr {
    id: number;
    name: string;
    description: string;
}

@Table({tableName: 'unit'})
export class Unit extends Model<Unit, UnitAttr> {
    @ApiProperty({example: '1', description: 'ID'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({example: 'шт.', description: 'Описание'})
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    name: string;

    @ApiProperty({example: 'Штуки', description: 'Описание'})
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    description: string;

    @Column({
        type: DataType.DATE,
    })
    deletedAt?: Date;

    @HasMany(() => NameWork)
    nameWork: NameWork[];


}

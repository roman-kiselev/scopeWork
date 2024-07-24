import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { NameWork } from 'src/name-work/entities/name-work.model';

interface UnitAttr {
    id: number;
    name: string;
    description: string;
    organizationId: number;
}

@Table({ tableName: 'unit' })
export class Unit extends Model<Unit, UnitAttr> {
    @ApiProperty({ example: '1', description: 'ID' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'шт.', description: 'Описание' })
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    name: string;

    @Column({ type: DataType.INTEGER })
    organizationId: number;

    @ApiProperty({ example: 'Штуки', description: 'Описание' })
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
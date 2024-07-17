import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeWork } from '../type-work/entities/type-work.model';
import { UnitController } from './unit.controller';
import { Unit } from './unit.model';
import { UnitService } from './unit.service';

@Module({
    controllers: [UnitController],
    providers: [UnitService],
    imports: [SequelizeModule.forFeature([Unit, TypeWork])],
    exports: [UnitService],
})
export class UnitModule {}

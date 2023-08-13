import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {UnitController} from './unit.controller';
import {Unit} from './unit.model';
import {UnitService} from './unit.service';
import {TypeWork} from "../type-work/type-work.model";

@Module({
    controllers: [UnitController],
    providers: [UnitService],
    imports: [SequelizeModule.forFeature([Unit, TypeWork]),

    ],
    exports: [UnitService],
})
export class UnitModule {
}

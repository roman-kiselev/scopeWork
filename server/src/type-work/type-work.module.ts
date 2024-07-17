import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListNameWork } from 'src/list-name-work/entities/list-name-work.model';
import { NameWorkTypeWork } from 'src/name-work/name-work-typework';
import { ObjectTypeWork } from 'src/objects/entities/objects-type_work.model';
import { Objects } from 'src/objects/entities/objects.model';
import { ObjectsModule } from 'src/objects/objects.module';
import { TypeWork } from './entities/type-work.model';
import { TypeWorkController } from './type-work.controller';
import { TypeWorkService } from './type-work.service';

@Module({
    controllers: [TypeWorkController],
    providers: [TypeWorkService],
    imports: [
        SequelizeModule.forFeature([
            TypeWork,
            Objects,
            ObjectTypeWork,
            NameWorkTypeWork,
            ListNameWork,
        ]),
        forwardRef(() => ObjectsModule),
    ],
    exports: [TypeWorkService, SequelizeModule.forFeature([TypeWork])],
})
export class TypeWorkModule {}

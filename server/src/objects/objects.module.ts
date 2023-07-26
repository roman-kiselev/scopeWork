import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScopeWork } from 'src/scope-work/scope-work.model';
import { TypeWork } from 'src/type-work/type-work.model';
import { TypeWorkModule } from 'src/type-work/type-work.module';
import { ObjectTypeWork } from './objects-type_work.model';
import { ObjectsController } from './objects.controller';
import { Objects } from './objects.model';
import { ObjectsService } from './objects.service';

@Module({
  controllers: [ObjectsController],
  providers: [ObjectsService],
  imports: [
    forwardRef(() => TypeWorkModule),
    SequelizeModule.forFeature([Objects, TypeWork, ObjectTypeWork]),
  ],
  exports: [ObjectsService],
})
export class ObjectsModule {}

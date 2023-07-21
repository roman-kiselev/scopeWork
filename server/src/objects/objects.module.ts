import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeWork } from 'src/type-work/type-work.model';
import { ObjectTypeWork } from './objects-type_work.model';
import { ObjectsController } from './objects.controller';
import { Objects } from './objects.model';
import { ObjectsService } from './objects.service';

@Module({
  controllers: [ObjectsController],
  providers: [ObjectsService],
  imports: [SequelizeModule.forFeature([Objects, TypeWork, ObjectTypeWork])],
  exports: [ObjectsService],
})
export class ObjectsModule {}

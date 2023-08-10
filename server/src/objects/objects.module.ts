import { Module } from '@nestjs/common'
import { forwardRef } from '@nestjs/common/utils'
import { SequelizeModule } from '@nestjs/sequelize'
import { TypeWork } from 'src/type-work/type-work.model'
import { TypeWorkModule } from 'src/type-work/type-work.module'
import { ObjectTypeWork } from './objects-type_work.model'
import { ObjectsController } from './objects.controller'
import { Objects } from './objects.model'
import { ObjectsService } from './objects.service'
import { AuthModule } from '../auth/auth.module'

@Module({
    controllers: [ObjectsController],
    providers: [ObjectsService],
    imports: [
        forwardRef(() => TypeWorkModule),
        forwardRef(() => AuthModule),
        SequelizeModule.forFeature([Objects, TypeWork, ObjectTypeWork])

    ],
    exports: [ObjectsService]
})
export class ObjectsModule {
}

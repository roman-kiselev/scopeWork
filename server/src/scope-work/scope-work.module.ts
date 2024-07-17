import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from 'src/database/database.module';
import { IamModule } from 'src/iam/iam.module';
import { ListNameWork } from 'src/list-name-work/entities/list-name-work.model';
import { ListNameWorkModule } from 'src/list-name-work/list-name-work.module';
import { NameList } from 'src/name_list/entities/name-list.model';
import { NameListModule } from 'src/name_list/name_list.module';
import { ObjectTypeWork } from 'src/objects/entities/objects-type_work.model';
import { Objects } from 'src/objects/entities/objects.model';
import { TableAddingData } from 'src/table-adding-data/entities/table-adding-data.model';
import { TableAddingDataModule } from 'src/table-adding-data/table-adding-data.module';
import { TypeWork } from 'src/type-work/entities/type-work.model';
import { ScopeWork } from './entities/scope-work.model';
import { UserScopeWork } from './entities/user-scope-work.model';
import { ScopeWorkUserService } from './scope-work-user.service';
import { ScopeWorkController } from './scope-work.controller';
import { ScopeWorkService } from './scope-work.service';

@Module({
    controllers: [ScopeWorkController],
    providers: [ScopeWorkService, ScopeWorkUserService],
    imports: [
        forwardRef(() => IamModule),
        forwardRef(() =>
            ClientsModule.register([
                {
                    name: 'USER_MAIN_SERVICE',
                    transport: Transport.RMQ,
                    options: {
                        urls: ['amqp://localhost:5672'],
                        queue: 'iam_queue',
                        queueOptions: {
                            durable: true,
                        },
                    },
                },
            ]),
        ),
        SequelizeModule.forFeature([
            ScopeWork,
            UserScopeWork,
            TypeWork,
            ObjectTypeWork,
            NameList,
            UserScopeWork,
            ListNameWork,
            Objects,
            TableAddingData,
        ]),
        NameListModule,
        DatabaseModule,
        ListNameWorkModule,
        TableAddingDataModule,
    ],
    exports: [
        ScopeWorkService,
        ScopeWorkUserService,
        SequelizeModule.forFeature([ScopeWork, UserScopeWork]),
    ],
})
export class ScopeWorkModule {}

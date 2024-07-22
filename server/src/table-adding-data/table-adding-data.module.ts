import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListNameWork } from 'src/list-name-work/entities/list-name-work.model';
import { NameWork } from 'src/name-work/entities/name-work.model';
import { NameList } from 'src/name_list/entities/name-list.model';
import { ScopeWork } from 'src/scope-work/entities/scope-work.model';
import { Unit } from 'src/unit/entities/unit.model';
import { DelTableAddingData } from './entities/del-table-adding-data.model';
import { TableAddingData } from './entities/table-adding-data.model';
import { TableAddingDataController } from './table-adding-data.controller';
import { TableAddingDataService } from './table-adding-data.service';

@Module({
    controllers: [TableAddingDataController],
    providers: [TableAddingDataService],
    imports: [
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
        forwardRef(() =>
            ClientsModule.register([
                {
                    name: 'USER_DESCRIPTION_MAIN_SERVICE',
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
            TableAddingData,
            NameList,
            ScopeWork,
            NameWork,
            ListNameWork,
            Unit,
            DelTableAddingData,
        ]),
    ],
    exports: [
        TableAddingDataService,
        SequelizeModule.forFeature([TableAddingData]),
    ],
})
export class TableAddingDataModule {}

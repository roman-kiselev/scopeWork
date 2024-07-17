import { Module } from '@nestjs/common';

@Module({
    providers: [],
    controllers: [],
    imports: [
        // SequelizeModule.forFeature([
        //     User,
        //     Roles,
        //     UserRole,
        //     UserDescription,
        //     UserScopeWork,
        //     TableAddingData,
        //     Objects,
        //     ListNameWork,
        //     ScopeWork,
        //     NameList,
        //     DelTableAddingData,
        // ]),
        // forwardRef(() =>
        //     ClientsModule.register([
        //         {
        //             name: 'USER_MAIN_SERVICE',
        //             transport: Transport.RMQ,
        //             options: {
        //                 urls: ['amqp://localhost:5672'],
        //                 queue: 'iam_queue',
        //                 queueOptions: {
        //                     durable: true,
        //                 },
        //             },
        //         },
        //     ]),
        // ),
    ],
    exports: [],
})
export class UserModule {}

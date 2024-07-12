import {
    forwardRef,
    MiddlewareConsumer,
    Module,
    NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from './database/database.module';
import { CheckToken } from './middlewares/check-token.middleware';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import { OrderReceiptNameModule } from './order-receipt-name/order-receipt-name.module';
import { OrderReceiptModule } from './order-receipt/order-receipt.module';
import { OrderModule } from './order/order.module';
import { ProviderModule } from './provider/provider.module';
import { StorageModule } from './storage/storage.module';
import { TransportCompanyModule } from './transport-company/transport-company.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `${process.env.NODE_ENV}.env`,
        }),
        DatabaseModule,
        OrderModule,
        StorageModule,
        UserModule,
        ProviderModule,
        TransportCompanyModule,
        OrderReceiptModule,
        OrderReceiptNameModule,
        forwardRef(() =>
            ClientsModule.register([
                {
                    name: 'IAM_SERVICE',
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
    ],

    controllers: [],
    providers: [CheckToken],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggingMiddleware, CheckToken).forRoutes('*');
    }
}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
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
    ],

    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggingMiddleware).forRoutes('*');
    }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { OrderModule } from './order/order.module';
import { StorageModule } from './storage/storage.module';
import { UserModule } from './user/user.module';
import { ProviderModule } from './provider/provider.module';
import { TransportCompanyModule } from './transport-company/transport-company.module';

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
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}

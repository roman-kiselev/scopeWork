import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from 'src/database/database.module';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';

@Module({
  controllers: [StorageController],
  providers: [StorageService],
  imports: [
    forwardRef(() =>
      ClientsModule.register([
        {
          name: 'STORAGE_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'scopework_queue',
            queueOptions: {
              durable: true,
            },
          },
        },
      ]),
    ),
    DatabaseModule,
  ],
  exports: [StorageService],
})
export class StorageModule {}

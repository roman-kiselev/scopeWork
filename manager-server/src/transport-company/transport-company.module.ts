import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TransportCompanyController } from './transport-company.controller';
import { TransportCompanyService } from './transport-company.service';

@Module({
  providers: [TransportCompanyService],
  controllers: [TransportCompanyController],
  imports: [DatabaseModule],
})
export class TransportCompanyModule {}

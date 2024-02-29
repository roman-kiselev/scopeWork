import { Module } from '@nestjs/common';
import { PrismaService } from './database.service';

@Module({
  providers: [PrismaService],
  imports: [],
  exports: [PrismaService],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TransactionsModule } from './transactions/transactions.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({ isGlobal: true }), TransactionsModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

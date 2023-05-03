import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateTransactionDto } from './dtos/createTransactions.dto';
import { TransactionsService } from './transactions.service';
import { ResponseClass } from 'src/factory/response';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  //   Class objects
  response = new ResponseClass();

  @Post()
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.response.sendResponse(
      'Transaction is successfull',
      await this.transactionService.createTransaction(createTransactionDto),
    );
  }
}

import { Injectable } from '@nestjs/common';
import { CRUD } from 'src/factory/crud.factory';
import { ResponseClass } from 'src/factory/response';
import { Utils } from 'src/factory/utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  // Classes Object
  utils = new Utils();
  crud = new CRUD();
  response = new ResponseClass();

  //   Create Transaction Logic
  async createTransaction(createTransactionDto: any) {
    console.log(createTransactionDto);

    // Get Sender Data
    const sender = await this.crud.findById(
      this.prisma.customer,
      createTransactionDto.senderId,
    );

    // Get Receiver Data
    const receiver = await this.crud.findById(
      this.prisma.customer,
      createTransactionDto.receiverId,
    );

    // Get New Transfer
    const transfer = await this.crud.createTransfer(
      this.prisma.transfer,
      createTransactionDto.amount,
    );

    // Get the Created Transaction
    const transaction = await this.crud.createTransaction(
      this.prisma.transaction,
      sender.id,
      receiver.id,
      transfer.id,
    );

    // Calculate Balance after transaction
    const senderNewAmount = this.utils.calculateBalance(
      sender.balance,
      transfer.amount,
      's',
    );
    const receiverNewAmount = this.utils.calculateBalance(
      receiver.balance,
      transfer.amount,
      'r',
    );

    console.log(receiverNewAmount, senderNewAmount);
    // Update Amount in Sender & Receiver
    await this.crud.updateCustomer(this.prisma.customer, sender.id, {
      balance: senderNewAmount,
    });
    await this.crud.updateCustomer(this.prisma.customer, receiver.id, {
      balance: receiverNewAmount,
    });
    console.log(sender, receiver, transfer, transaction);
    return { ...transaction, amount: transfer.amount };
  }
}

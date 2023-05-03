import { IsUUID, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  senderId: string;

  @IsUUID()
  receiverId: string;

  @IsNumber()
  amount: number;
}

import { Prisma, PrismaClient } from '@prisma/client';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ErrorHandler } from './errorHandler';
import { ResponseClass } from './response';

export class CRUD {
  // Classes Object
  errorHandler = new ErrorHandler();

  //   Create New Customer Logic
  async create(model: any, data: any) {
    try {
      return await model.create({
        data: data,
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002')
          throw this.errorHandler.createError(
            'This user is already exists.',
            403,
          );
      }
      throw err;
    }
  }

  //   Get All Customers Logic
  async findAll(model: any) {
    try {
      return await model.findMany({});
    } catch (err) {
      throw err;
    }
  }

  //   Get All Customers Logic
  async findById(model: any, cid: any) {
    try {
      return await model.findUnique({
        where: {
          id: cid,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  // Create new Transfer
  async createTransfer(model: any, amount: number) {
    try {
      return await model.create({
        data: {
          amount,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  // Create new Transaction Logic
  async createTransaction(
    model: any,
    senderId: any,
    receiverId: any,
    transferId: any,
  ) {
    try {
      return await model.create({
        data: {
          senderId,
          receiverId,
          transferId,
          status: true,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  // Update Customer
  async updateCustomer(model: any, cid: any, updatedData: any) {
    try {
      await model.update({
        where: {
          id: cid,
        },
        data: updatedData,
      });
    } catch (err) {
      throw err;
    }
  }
}

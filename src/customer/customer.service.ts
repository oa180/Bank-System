import { Injectable } from '@nestjs/common';
import { CRUD } from 'src/factory/crud.factory';
import { ResponseClass } from 'src/factory/response';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  // Classes Object
  crud = new CRUD();
  response = new ResponseClass();

  //   Create new Customer Handler
  async createNewCustomer(createCustomerDto: any) {
    return this.response.sendResponse(
      '',
      await this.crud.create(this.prisma.customer, createCustomerDto),
      200,
    );
  }

  //   Get All Customers Handler

  async getAllCustomers() {
    return this.response.sendResponse(
      'All Customers',
      await this.crud.findAll(this.prisma.customer),
      200,
    );
  }

  //   Get a Customer Handler
  async getACustomer(cid: any) {
    return this.response.sendResponse(
      'All Customers',
      await this.crud.findById(this.prisma.customer, cid),
      200,
    );
  }
}

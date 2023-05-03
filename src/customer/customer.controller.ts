import { Controller, Post, Get, Body } from '@nestjs/common';
import { createCustomerDto } from './dtos/createCustomer.dto';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  //   Get All Customers
  @Get()
  getAllCustomers() {
    return this.customerService.getAllCustomers();
  }

  //   Get A Customer By ID
  @Post()
  getACustomer(@Body('cid') cid: string) {
    return this.customerService.getACustomer(cid);
  }

  //   Create New Customer
  @Post('create')
  createNewCustomer(@Body() createCustomerDto: createCustomerDto) {
    return this.customerService.createNewCustomer(createCustomerDto);
  }
}

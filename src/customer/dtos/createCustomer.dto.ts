import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class createCustomerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('EG')
  phone: string;
}

import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';
import { Request, Response } from 'express';
import { ListCustomersUseCase } from './ListCustomersUseCase';

class ListCustomersController {
  async handle(
    request: Request,
    response: Response,
  ): Promise<Response<Customer[]>> {
    const listCustomersUseCase = new ListCustomersUseCase();
    const customers = await listCustomersUseCase.execute();
    return response.json(customers);
  }
}

export { ListCustomersController };

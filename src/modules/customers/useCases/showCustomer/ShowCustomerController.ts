import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';
import { Request, Response } from 'express';
import { ShowCustomerUseCase } from './ShowCustomerUseCase';

class ShowCustomerController {
  async handle(
    request: Request,
    response: Response,
  ): Promise<Response<Customer>> {
    const { id } = request.params;
    const showCustomerUseCase = new ShowCustomerUseCase();

    const customer = showCustomerUseCase.execute(id);

    return response.json(customer);
  }
}

export { ShowCustomerController };

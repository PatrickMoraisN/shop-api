import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';
import { Request, Response } from 'express';
import { CreateCustomerUseCase } from './CreateCustomerUseCase';

class CreateCustomerController {
  async handle(
    request: Request,
    response: Response,
  ): Promise<Response<Customer>> {
    const { name, email } = request.body;
    const createCustomerUseCase = new CreateCustomerUseCase();
    const customer = await createCustomerUseCase.execute({
      name,
      email,
    });
    return response.json(customer);
  }
}

export { CreateCustomerController };

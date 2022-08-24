import { Request, Response } from 'express';
import { UpdateCustomerUseCase } from './UpdateCustomerUseCase';

class UpdateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const { id } = request.params;

    const updateCustomerUseCase = new UpdateCustomerUseCase();

    const customer = await updateCustomerUseCase.execute({
      id,
      name,
      email,
    });

    return response.json(customer);
  }
}

export { UpdateCustomerController };

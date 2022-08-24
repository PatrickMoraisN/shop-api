import { Request, Response } from 'express';
import { DeleteCustomerUseCase } from './DeleteCustomerUseCase';

class DeleteCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteCustomerUseCase = new DeleteCustomerUseCase();
    await deleteCustomerUseCase.execute(id);

    return response.status(204).json({ message: 'Customer deleted' });
  }
}

export { DeleteCustomerController };

import { Request, Response } from 'express';
import { UpdateProductUseCase } from './UpdateProductUseCase';

class UpdateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;
    const updateProductUseCase = new UpdateProductUseCase();
    await updateProductUseCase.execute({
      id,
      name,
      price,
      quantity,
    });
    return response.status(204).send();
  }
}

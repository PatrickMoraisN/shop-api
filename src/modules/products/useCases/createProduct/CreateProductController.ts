import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { Request, Response } from 'express';
import { CreateProductUseCase } from './CreateProductUseCase';

class CreateProductController {
  async handle(
    request: Request,
    response: Response,
  ): Promise<Response<Product>> {
    const { name, price, quantity } = request.body;
    const createProductUseCase = new CreateProductUseCase();
    const product = await createProductUseCase.execute({
      name,
      price,
      quantity,
    });
    return response.json(product);
  }
}

export { CreateProductController };

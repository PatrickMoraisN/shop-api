import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { Request, Response } from 'express';
import { ShowProductUseCase } from './ShowProductUseCase';

class ShowProductController {
  async execute(
    request: Request,
    response: Response,
  ): Promise<Response<Product>> {
    const { id } = request.params;
    const showProductUseCase = new ShowProductUseCase();
    const product = await showProductUseCase.execute(id);
    return response.json(product);
  }
}

export { ShowProductController };

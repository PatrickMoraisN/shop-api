import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { Request, Response } from 'express';
import { ListProductUseCase } from './ListProductUseCase';

class ListProductController {
  async handle(
    request: Request,
    response: Response,
  ): Promise<Response<Product[]>> {
    const listProductUseCase = new ListProductUseCase();
    const products = await listProductUseCase.execute();
    return response.json(products);
  }
}

export { ListProductController };

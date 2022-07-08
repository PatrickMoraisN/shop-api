import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

class ShowProductUseCase {
  async execute(id: string): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findOne({ where: { id } });
    if (!productExists) {
      throw new AppError('Product not found', 404);
    }
    return productExists;
  }
}

export { ShowProductUseCase };

import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';

class ListProductUseCase {
  async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);
    return productRepository.find();
  }
}

export { ListProductUseCase };

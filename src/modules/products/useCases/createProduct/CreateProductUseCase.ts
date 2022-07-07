import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductUseCase {
  public async execute(product: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findByName(product.name);
    if (productExists) {
      throw new AppError('Product already exists', 400);
    }
    const productCreated = productRepository.create(product);
    return productRepository.save(productCreated);
  }
}

export { CreateProductUseCase };

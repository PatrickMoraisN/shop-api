import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductUseCase {
  async execute(data: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findOne(data.id);

    if (!productExists) {
      throw new AppError('Product not found', 404);
    }

    const productHasSameName = await productRepository.findByName(data.name);
    if (productHasSameName && data.name !== productExists.name) {
      throw new AppError('Product already exists', 400);
    }

    Object.assign(productExists, data);

    await productRepository.save(productExists);

    return productExists;
  }
}

export { UpdateProductUseCase };

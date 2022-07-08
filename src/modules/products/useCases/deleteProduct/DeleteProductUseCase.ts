import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

class DeleteProductUseCase {
  async execute(id: string): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findOne({ where: { id } });
    if (!productExists) {
      throw new AppError('Product not found', 404);
    }
    await productRepository.remove(productExists);
  }
}

export { DeleteProductUseCase };

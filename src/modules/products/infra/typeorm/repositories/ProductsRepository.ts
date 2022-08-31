import { EntityRepository, In, Repository } from 'typeorm';
import { Product } from '../entities/Product';

interface IFindProducts {
  id: string;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async findByName(name: string): Promise<Product | undefined> {
    return this.findOne({
      where: {
        name,
      },
    });
  }

  async findAllByIds(
    products: IFindProducts[],
  ): Promise<Product[] | undefined> {
    const productsIds = products.map(product => product.id);

    const productsExists = await this.find({
      where: {
        id: In(productsIds),
      },
    });

    return productsExists;
  }
}

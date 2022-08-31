import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { Order } from '@modules/orders/infra/typeorm/entities/Order';
import { OrdersRepository } from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderUseCase {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productRepository = getCustomRepository(ProductRepository);

    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.', 404);
    }

    const productsExists = await productRepository.findAllByIds(products);

    if (!productsExists) {
      throw new AppError('Could not find any products.', 404);
    }

    const productsExistsIds = productsExists.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !productsExistsIds.includes(product.id),
    );

    if (checkInexistentProducts) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}`,
        404,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        productsExists.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable) {
      throw new AppError(
        `Quantity ${quantityAvailable[0].quantity} is not available`,
        401,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productsExists.filter(p => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.id,
      quantity:
        productsExists.filter(p => p.id === product.id)[0].quantity -
        product.quantity,
    }));

    await productRepository.save(updatedProductQuantity);

    return order;
  }
}

export { CreateOrderUseCase as CreateProductUseCase };

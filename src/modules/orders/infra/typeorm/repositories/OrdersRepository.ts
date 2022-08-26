import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';
import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../entities/Order';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  async findById(id: string): Promise<Order | undefined> {
    return this.findOne(id, {
      relations: ['order_products', 'customer'],
    });
  }

  async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  }
}

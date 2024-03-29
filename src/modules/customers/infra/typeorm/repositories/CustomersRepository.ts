import { EntityRepository, Repository } from 'typeorm';
import { Customer } from '../entities/Customer';

@EntityRepository(Customer)
export class CustomersRepository extends Repository<Customer> {
  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: { name },
    });

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    return this.findOne({ where: { id } });
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.findOne({ where: { email } });

    return customer;
  }
}

import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';
import { getRepository } from 'typeorm';

class ListCustomersUseCase {
  async execute(): Promise<Customer[]> {
    const customersRepository = getRepository(Customer);
    return await customersRepository.find();
  }
}

export { ListCustomersUseCase };

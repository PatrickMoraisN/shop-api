import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

class ShowCustomerUseCase {
  async execute(id: string): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    return customer;
  }
}

export { ShowCustomerUseCase };

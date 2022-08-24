import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

class DeleteCustomerUseCase {
  async execute(id: string): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    await customersRepository.remove(customer);
  }
}

export { DeleteCustomerUseCase };

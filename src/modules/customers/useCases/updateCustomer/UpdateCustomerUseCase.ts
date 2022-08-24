import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
  name?: string;
  email: string;
}

class UpdateCustomerUseCase {
  async execute(customer: IRequest): Promise<Customer> {
    const { id } = customer;

    const customersRepository = getCustomRepository(CustomersRepository);
    const customerFound = await customersRepository.findById(id);

    if (!customerFound) {
      throw new AppError('Customer not found', 404);
    }

    const customerHasSameEmail = await customersRepository.findByEmail(
      customer.email,
    );

    if (customerHasSameEmail && customer?.email !== customerFound.email) {
      throw new AppError('Customer already exists', 400);
    }

    Object.assign(customerFound, {
      ...customer,
    });

    const customerUpdated = await customersRepository.save(customerFound);

    return customerUpdated;
  }
}

export { UpdateCustomerUseCase };

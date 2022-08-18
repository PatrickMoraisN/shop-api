import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';
import { AppError } from '@shared/errors/AppError';
import { getRepository } from 'typeorm';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerUseCase {
  async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getRepository(Customer);

    const customerExists = await customersRepository.findOne({
      where: { email },
    });

    if (customerExists) {
      throw new AppError('Customer already exists');
    }

    const customer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);

    return customer;
  }
}

export { CreateCustomerUseCase };

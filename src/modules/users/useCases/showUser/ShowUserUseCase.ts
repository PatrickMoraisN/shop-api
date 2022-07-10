import { User } from '@modules/users/infra/typeorm/entities/Users';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

class ShowUserUseCase {
  async execute(id: string): Promise<User> {
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export { ShowUserUseCase };
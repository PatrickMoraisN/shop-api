import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

class DeleteUserUseCase {
  async execute(id: string): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    await usersRepository.remove(user);
  }
}

export { DeleteUserUseCase };

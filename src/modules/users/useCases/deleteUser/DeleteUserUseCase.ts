import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

class DeleteUserUseCase {
  async execute(userId: string): Promise<void> {
    const userRepository = new UsersRepository();
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found');
    }
    await userRepository.remove(user);
  }
}

export { DeleteUserUseCase };

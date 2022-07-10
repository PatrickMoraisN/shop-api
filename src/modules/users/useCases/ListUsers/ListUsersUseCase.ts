import { User } from '@modules/users/infra/typeorm/entities/Users';
import { getRepository } from 'typeorm';

class ListUsersUseCase {
  async execute(): Promise<User[]> {
    const usersRepository = getRepository(User);
    return usersRepository.find();
  }
}

export { ListUsersUseCase };

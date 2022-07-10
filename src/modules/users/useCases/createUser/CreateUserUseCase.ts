import { User } from '@modules/users/infra/typeorm/entities/Users';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserUseCase {
  async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne({
      where: { email },
    });

    if (userExists) {
      throw new AppError('User already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserUseCase };

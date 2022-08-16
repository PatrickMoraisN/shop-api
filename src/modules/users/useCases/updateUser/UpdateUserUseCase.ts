import { User } from '@modules/users/infra/typeorm/entities/Users';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
  name?: string;
  email: string;
  password?: string;
  old_password?: string;
  password_confirmation?: string;
}

class UpdateUserUseCase {
  async execute(user: IRequest): Promise<User> {
    const {
      id,
      password,
      old_password,
      password_confirmation,
    } = user;

    const usersRepository = getCustomRepository(UsersRepository);
    const userFound = await usersRepository.findById(id);

    if (!userFound) {
      throw new AppError('User not found', 404);
    }

    const userHasSameEmail = await usersRepository.findByEmail(user.email);

    if (userHasSameEmail && user?.email !== userFound.email) {
      throw new AppError('User already exists', 400);
    }

    if (password && !old_password) {
      throw new AppError('Old password is required', 401);
    }

    if (password && old_password) {
      const isPasswordValid = compare(
        old_password,
        userFound.password
      );

      if (!isPasswordValid) {
        throw new AppError('Invalid password', 401);
      }
    }

    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        throw new AppError('Password confirmation does not match', 401);
      }
    }

    Object.assign(userFound, {
      ...user,
      password: password ? await hash(password, 8) : userFound.password
    });

    const userUpdated = await usersRepository.save(userFound);

    return userUpdated;
  }
}

export { UpdateUserUseCase };

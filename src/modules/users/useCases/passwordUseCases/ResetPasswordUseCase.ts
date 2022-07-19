import { User } from '@modules/users/infra/typeorm/entities/Users';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordUseCase {
  async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UsersTokensRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.createdAt;

    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = await hash(password, 8);

    await usersRepository.save(user);

    await userTokenRepository.delete(userToken);

    return;
  }
}

export { ResetPasswordUseCase };

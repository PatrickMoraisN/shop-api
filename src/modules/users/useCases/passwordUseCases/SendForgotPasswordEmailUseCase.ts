import { User } from '@modules/users/infra/typeorm/entities/Users';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { EtherealMail } from '@config/mail/EtherealMail';

class SendForgotPasswordEmailUseCase {
  async execute(email: string): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UsersTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found');
    }

    const token = await userTokenRepository.generate(user.id);

    await EtherealMail.sendMail({
      to: email,
      body: `<p>Você está recebendo este e-mail porque recebemos um pedido de redefinição de senha para sua conta.</p>
      <p>Para redefinir sua senha, acesse o link abaixo:</p>
      <p>http://localhost:3000/reset-password?token=${token}</p>
      <p>Se você não solicitou uma redefinição de senha, ignore este e-mail.</p>`,
    });

    return;
  }
}

export { SendForgotPasswordEmailUseCase };

import { User } from '@modules/users/infra/typeorm/entities/Users';
import { Request, Response } from 'express';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response<User>> {
    const { id: userId } = request.user;
    const avatarFilename = request.file?.filename as string;

    const updateUserAvatarUseCase = new UpdateUserAvatarUseCase();
    const user = await updateUserAvatarUseCase.execute({
      userId,
      avatarFilename,
    });

    return response.json(user);
  }
}

export { UpdateUserAvatarController };

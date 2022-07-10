import { User } from '@modules/users/infra/typeorm/entities/Users';
import { Request, Response } from 'express';
import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const deleteUserUseCase = new DeleteUserUseCase();
    await deleteUserUseCase.execute(userId);

    return response.status(204).json({ message: 'User deleted' });
  }
}

export { DeleteUserController };

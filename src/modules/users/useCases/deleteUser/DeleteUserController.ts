import { Request, Response } from 'express';
import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUserUseCase = new DeleteUserUseCase();
    await deleteUserUseCase.execute(id);

    return response.status(204).json({ message: 'User deleted' });
  }
}

export { DeleteUserController };

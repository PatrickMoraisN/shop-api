import { Request, Response } from 'express';
import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      old_password,
      password_confirmation,
    } = request.body;

    const { id } = request.user;

    const updateUserUseCase = new UpdateUserUseCase();

    const user = await updateUserUseCase.execute({
      id,
      name,
      email,
      password,
      old_password,
      password_confirmation,
    });

    return response.json(user);
  }
}

export { UpdateUserController };

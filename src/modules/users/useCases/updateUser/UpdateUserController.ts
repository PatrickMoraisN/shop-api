import { Request, Response } from 'express';
import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, name, email, password } = request.body;
    const updateUserUseCase = new UpdateUserUseCase();
    const user = await updateUserUseCase.execute({
      id,
      name,
      email,
      password,
    });

    return response.json(user);
  }
}

export { UpdateUserController };
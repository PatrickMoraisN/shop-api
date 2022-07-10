import { Request, Response } from 'express';
import { ShowUserUseCase } from './ShowUserUseCase';

class ShowUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const showUserUseCase = new ShowUserUseCase();
    const user = await showUserUseCase.execute(userId);

    return response.json(user);
  }
}

export { ShowUserController };

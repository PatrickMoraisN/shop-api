import { Request, Response } from 'express';
import { ShowUserUseCase } from './ShowUserUseCase';

class ShowUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showUserUseCase = new ShowUserUseCase();
    const user = await showUserUseCase.execute(id);

    return response.json(user);
  }
}

export { ShowUserController };

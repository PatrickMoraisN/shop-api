import { Request, Response } from 'express';
import { CreateSessionUseCase } from './CreateSessionUseCase';

class CreateSessionController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    const createSessionUseCase = new CreateSessionUseCase();
    const { user, token } = await createSessionUseCase.execute({
      email,
      password,
    });
    return response.json({ user, token });
  }
}

export { CreateSessionController };

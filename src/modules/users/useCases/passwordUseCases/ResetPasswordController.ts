import { Request, Response } from 'express';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';

class ResetPasswordController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { token, password } = request.body;

    const resetPasswordUseCase = new ResetPasswordUseCase();

    await resetPasswordUseCase.execute({ token, password });

    return response.status(204).send();
  }
}

export { ResetPasswordController };

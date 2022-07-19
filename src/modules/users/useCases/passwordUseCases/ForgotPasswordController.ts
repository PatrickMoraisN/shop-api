import { Request, Response } from 'express';
import { SendForgotPasswordEmailUseCase } from './SendForgotPasswordEmailUseCase';

class ForgotPasswordController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmailUseCase();

    await sendForgotPasswordEmail.execute(email);

    return response.status(204).send();
  }
}

export { ForgotPasswordController };

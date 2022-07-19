import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { ForgotPasswordController } from '../useCases/passwordUseCases/ForgotPasswordController';
import { ResetPasswordController } from '../useCases/passwordUseCases/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.execute,
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.execute,
);

export { passwordRouter };

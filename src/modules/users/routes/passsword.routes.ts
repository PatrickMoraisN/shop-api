import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { ForgotPasswordController } from '../useCases/passwordUseCases/ForgotPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.execute,
);

export { passwordRouter };

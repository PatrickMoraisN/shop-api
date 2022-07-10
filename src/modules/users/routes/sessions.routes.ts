import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { CreateSessionController } from '../useCases/createSession/CreateSessionController';

const sessionsRouter = Router();
const createSessionController = new CreateSessionController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  createSessionController.handle,
);

export { sessionsRouter };

import { Router } from 'express';
import { CreateUserController } from '../useCases/createUser/CreateUserController';
import { ListUsersController } from '../useCases/listUsers/ListUsersController';
import { celebrate, Joi, Segments } from 'celebrate';

const usersRouter = Router();

const listUsersController = new ListUsersController();
const createUserController = new CreateUserController();

usersRouter.get('/', listUsersController.handle);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  createUserController.handle,
);

export { usersRouter };

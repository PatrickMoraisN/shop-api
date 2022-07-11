import { Router } from 'express';
import { CreateUserController } from '../useCases/createUser/CreateUserController';
import { ListUsersController } from '../useCases/listUsers/ListUsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import { DeleteUserController } from '../useCases/deleteUser/DeleteUserController';
import { ShowUserController } from '../useCases/showUser/ShowUserController';
import { UpdateUserController } from '../useCases/updateUser/UpdateUserController';
import { isAuthenticated } from '@shared/infra/http/middlewares/isAuthenticated';

const usersRouter = Router();

const listUsersController = new ListUsersController();
const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const showUserController = new ShowUserController();
const updateUserController = new UpdateUserController();

usersRouter.get('/', isAuthenticated, listUsersController.handle);

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

usersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  deleteUserController.handle,
);

usersRouter.get('/', listUsersController.handle);

usersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(6),
    },
  }),
  updateUserController.handle,
);

usersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  showUserController.handle,
);

export { usersRouter };

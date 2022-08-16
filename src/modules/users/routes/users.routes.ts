import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

import { CreateUserController } from '../useCases/createUser/CreateUserController';
import { ListUsersController } from '../useCases/listUsers/ListUsersController';
import { DeleteUserController } from '../useCases/deleteUser/DeleteUserController';
import { ShowUserController } from '../useCases/showUser/ShowUserController';
import { UpdateUserController } from '../useCases/updateUser/UpdateUserController';
import { UpdateUserAvatarController } from '../useCases/updateUserAvatar/UpdateUserAvatarController';
import { isAuthenticated } from '@shared/infra/http/middlewares/isAuthenticated';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

const listUsersController = new ListUsersController();
const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const showUserController = new ShowUserController();
const updateUserController = new UpdateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.get('/', isAuthenticated, listUsersController.handle);

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  updateUserAvatarController.handle,
);

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
  isAuthenticated,
  deleteUserController.handle,
);

usersRouter.get('/', listUsersController.handle);

usersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      old_password: Joi.string().min(6),
      password: Joi.string().min(6).optional(),
      password_confirmation: Joi.string().min(6)
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  isAuthenticated,
  updateUserController.handle,
);

usersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  isAuthenticated,
  showUserController.handle,
);

export { usersRouter };

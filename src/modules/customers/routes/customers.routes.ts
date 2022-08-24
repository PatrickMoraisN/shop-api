import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { CreateCustomerController } from '../useCases/createCustomer/CreateCustomerController';
import { ListCustomersController } from '../useCases/listCustomers/ListCustomersController';
import { DeleteCustomerController } from '../useCases/deleteCustomer/DeleteCustomerController';
import { ShowCustomerController } from '../useCases/showCustomer/ShowCustomerController';
import { UpdateCustomerController } from '../useCases/updateCustomer/UpdateCustomerController';
import { isAuthenticated } from '@shared/infra/http/middlewares/isAuthenticated';

const customersRouter = Router();

const listCustomersController = new ListCustomersController();
const createCustomerController = new CreateCustomerController();
const deleteCustomerController = new DeleteCustomerController();
const showCustomerController = new ShowCustomerController();
const updateCustomerController = new UpdateCustomerController();

customersRouter.get('/', isAuthenticated, listCustomersController.handle);

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  createCustomerController.handle,
);

customersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  isAuthenticated,
  deleteCustomerController.handle,
);

customersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  isAuthenticated,
  updateCustomerController.handle,
);

customersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  isAuthenticated,
  showCustomerController.handle,
);

export { customersRouter };

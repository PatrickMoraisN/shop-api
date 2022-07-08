import { Router } from 'express';
import { CreateProductController } from '../useCases/createProduct/CreateProductController';
import { DeleteProductController } from '../useCases/deleteProduct/DeleteProductController';
import { ListProductController } from '../useCases/listProduct/ListProductController';
import { ShowProductController } from '../useCases/showProduct/ShowProductController';
import { UpdateProductController } from '../useCases/updateProduct/UpdateProductController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();

const listProductController = new ListProductController();
const showProductController = new ShowProductController();
const createProductController = new CreateProductController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();

productsRouter.get('/', listProductController.handle);

productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  showProductController.handle,
);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  createProductController.handle,
);

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    },
  }),
  updateProductController.handle,
);

productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  deleteProductController.handle,
);

export { productsRouter };

import { Router } from 'express';
import { CreateProductController } from '../useCases/createProduct/CreateProductController';
import { DeleteProductController } from '../useCases/deleteProduct/DeleteProductController';
import { ListProductController } from '../useCases/listProduct/ListProductController';
import { ShowProductController } from '../useCases/showProduct/ShowProductController';
import { UpdateProductController } from '../useCases/updateProduct/UpdateProductController';

const productsRouter = Router();

const listProductController = new ListProductController();
const showProductController = new ShowProductController();
const createProductController = new CreateProductController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();

productsRouter.get('/', listProductController.handle);
productsRouter.get('/:id', showProductController.handle);
productsRouter.post('/', createProductController.handle);
productsRouter.put('/:id', updateProductController.handle);
productsRouter.delete('/:id', deleteProductController.handle);

export { productsRouter };

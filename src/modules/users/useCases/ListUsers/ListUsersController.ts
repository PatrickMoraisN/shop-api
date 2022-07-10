import { User } from '@modules/users/infra/typeorm/entities/Users';
import { Request, Response } from 'express';
import { ListUsersUseCase } from './ListUsersUseCase';

class ListUsersController {
  async handle(
    request: Request,
    response: Response,
  ): Promise<Response<User[]>> {
    const listUsersUseCase = new ListUsersUseCase();
    const users = await listUsersUseCase.execute();
    return response.json(users);
  }
}

export { ListUsersController };

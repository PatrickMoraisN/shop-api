import { EntityRepository, getRepository, Repository } from 'typeorm';
import { User } from '../entities/Users';

@EntityRepository(User)
export class UsersRepository {
  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { name },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { id } });

    return user;
  }

  constructor() {
    this.usersRepository = getRepository(User);
  }

  private usersRepository: Repository<User>;
}

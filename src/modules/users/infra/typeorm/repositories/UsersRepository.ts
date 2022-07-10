import { EntityRepository, getRepository, Repository } from 'typeorm';
import { User } from '../entities/Users';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
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

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });

    return user;
  }

  constructor() {
    super();
    this.usersRepository = getRepository(User);
  }

  private usersRepository: Repository<User>;
}

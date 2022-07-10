import { EntityRepository, getRepository, Repository } from 'typeorm';
import { User } from '../entities/Users';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { name },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.findOne({ where: { id } });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({ where: { email } });

    return user;
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
  ) {}

  // get count of all users
  async getCount(): Promise<number> {
    return await this.usersRepo.count();
  }

  // get users for a specific page
  async findByPage({ page, limit }): Promise<UsersEntity[]> {
    const skip = (page - 1) * limit;

    return await this.usersRepo.find({
      skip,
      take: limit,
    });
  }
}

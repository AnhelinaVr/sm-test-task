import { UserService } from './users.service';
import { Controller, Get, Logger, Query } from '@nestjs/common';
import { UsersResponseDto } from './users.response.dto';
import { USERS_PER_PAGE_LIMIT } from '../constants';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @Get()
  async getUsersByPage(@Query('page') page = 1, @Query('limit') limit = USERS_PER_PAGE_LIMIT) {
    this.logger.log('Get all users');
    const users = await this.userService.findByPage({ page, limit });
    return users.map((user) => UsersResponseDto.fromUsersEntity(user));
  }

  @Get('count')
  async getUsersCount() {
    this.logger.log('Get users total count');
    const count = await this.userService.getCount();
    return count;
  }
}

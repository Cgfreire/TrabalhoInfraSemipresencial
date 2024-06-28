import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './userssall.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({ status: 200, description: 'All users found successfully' })
  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }
}

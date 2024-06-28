import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersController } from './userssall.controller';
import { UsersService } from './userssall.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class userssallModule {}

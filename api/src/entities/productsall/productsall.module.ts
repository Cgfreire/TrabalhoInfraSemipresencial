import { Module } from '@nestjs/common';
import { ProductsallService } from './productsall.service';
import { ProductsallController } from './productsall.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ProductsallController],
  providers: [ProductsallService, PrismaService],
})
export class ProductsallModule {}

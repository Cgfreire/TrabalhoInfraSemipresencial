import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { PrismaService } from 'src/database/prisma.service';
@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductsModule {}

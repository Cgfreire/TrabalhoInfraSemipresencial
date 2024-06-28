import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProductsallService {
  constructor(private prisma: PrismaService) {}

  async findAllProducts() {
    try {
      const products = await this.prisma.product.findMany();
      return products;
    } catch (error) {
      throw error;
    }
  }
}

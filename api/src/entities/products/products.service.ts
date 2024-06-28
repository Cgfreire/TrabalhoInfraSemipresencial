import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createProductDto: CreateProductDto) {
    try {
      const { name, price, img } = createProductDto;

      const user = await this.prisma.user.findUnique({
        where: { id: Number(userId) },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found.`);
      }
      const priceFloat = Number(price);

      const createdProduct = await this.prisma.product.create({
        data: {
          name,
          price: priceFloat,
          img,
          user: {
            connect: { id: Number(userId) },
          },
        },
      });

      return createdProduct;
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: number) {
    try {
      const products = await this.prisma.product.findMany({
        where: {
          userId: Number(userId),
        },
      });

      if (!products || products.length === 0) {
        throw new NotFoundException(
          `Products not found for User with ID ${userId}.`,
        );
      }

      return products;
    } catch (error) {
      throw error;
    }
  }

  async findOne(userId: number, productId: number) {
    try {
      const product = await this.prisma.product.findUnique({
        where: {
          id: Number(productId),
        },
      });

      if (!product) {
        throw new NotFoundException(
          `Product with ID ${productId} not found for User with ID ${userId}.`,
        );
      }

      return product;
    } catch (error) {
      throw error;
    }
  }

  async update(
    userId: number,
    productId: number,
    updateProductDto: UpdateProductDto,
  ) {
    try {
      const { name, price, img } = updateProductDto;

      const existingProduct = await this.findOne(userId, productId);

      if (!existingProduct) {
        throw new NotFoundException(
          `Product with ID ${productId} not found for User with ID ${userId}.`,
        );
      }

      const updatedProduct = await this.prisma.product.update({
        where: {
          id: Number(productId),
        },
        include: {
          user: true,
        },
        data: {
          name,
          price: typeof price === 'string' ? parseFloat(price) : price,
          img,
        },
      });

      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  async delete(userId: number, productId: number) {
    try {
      const existingProduct = await this.findOne(userId, productId);

      if (!existingProduct) {
        throw new NotFoundException(
          `Product with ID ${productId} not found for User with ID ${userId}.`,
        );
      }

      await this.prisma.product.delete({
        where: {
          id: Number(productId),
        },
      });

      return { message: `Product with ID ${productId} successfully deleted.` };
    } catch (error) {
      throw error;
    }
  }
}

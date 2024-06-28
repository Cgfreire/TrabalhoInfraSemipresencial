import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';

@ApiTags('Products')
@Controller('users/:userId/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBody({ type: CreateProductDto })
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @Param('userId') userId: number,
  ) {
    return this.productService.create(userId, createProductDto);
  }

  @ApiOperation({ summary: 'Find all products' })
  @ApiResponse({ status: 200, description: 'Products found successfully' })
  @Get()
  findAll(@Param('userId') userId: number) {
    return this.productService.findAll(userId);
  }

  @ApiOperation({ summary: 'Find one product' })
  @ApiResponse({ status: 200, description: 'Product found successfully' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
  })
  @ApiParam({
    name: 'productId',
    description: 'Product ID',
  })
  @Get('/:productId')
  findOne(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ) {
    return this.productService.findOne(userId, productId);
  }

  @ApiBody({ type: UpdateProductDto })
  @ApiOperation({ summary: 'Update one product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
  })
  @ApiParam({
    name: 'productId',
    description: 'Product ID',
  })
  @Put('/:productId')
  update(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(userId, productId, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete one product' })
  @ApiResponse({ status: 204, description: 'Product deleted successfully' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
  })
  @ApiParam({
    name: 'productId',
    description: 'Product ID',
  })
  @Delete('/:productId')
  delete(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ) {
    return this.productService.delete(userId, productId);
  }
}

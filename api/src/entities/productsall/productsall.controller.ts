import { Controller, Get } from '@nestjs/common';
import { ProductsallService } from './productsall.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('productsall')
export class ProductsallController {
  constructor(private readonly productsallService: ProductsallService) {}

  @ApiOperation({ summary: 'Find all products' })
  @ApiResponse({ status: 200, description: 'All products found successfully' })
  @Get()
  findAll() {
    return this.productsallService.findAllProducts();
  }
}

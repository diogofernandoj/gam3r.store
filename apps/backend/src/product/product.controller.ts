import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductPrisma } from './product.prisma';
import { Product } from '@gstore/core';

@Controller('products')
export class ProductController {
  constructor(private readonly repository: ProductPrisma) {}

  @Post()
  saveProduct(@Body() product: Product): Promise<void> {
    return this.repository.saveProductRepository(product);
  }

  @Get()
  getProducts(): Promise<Product[]> {
    return this.repository.getProductsRepository();
  }

  @Get(':id')
  getProduct(@Param('id') id: string): Promise<Product> {
    return this.repository.getProductByIdRepository(+id);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<void> {
    return this.repository.deleteProductRepository(+id);
  }
}

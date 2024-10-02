import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductPrisma } from './product.prisma';
import { Product } from '@gstore/core';

@Controller('products')
export class ProductController {
  constructor(private readonly repo: ProductPrisma) {}

  @Post()
  salvarProduct(@Body() product: Product): Promise<void> {
    return this.repo.salvar(product);
  }

  @Get()
  obterProducts(): Promise<Product[]> {
    return this.repo.obter();
  }

  @Get(':id')
  obterProduct(@Param('id') id: string): Promise<Product> {
    return this.repo.obterPorId(+id);
  }

  @Delete(':id')
  excluirProduct(@Param('id') id: string): Promise<void> {
    return this.repo.excluir(+id);
  }
}

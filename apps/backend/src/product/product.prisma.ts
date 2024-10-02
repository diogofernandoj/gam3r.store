import { Product } from '@gstore/core';
import { Injectable } from '@nestjs/common';
import { PrismaProvider } from 'src/db/prisma.provider';

@Injectable()
export class ProductPrisma {
  constructor(readonly prisma: PrismaProvider) {}

  async salvar(product: Product): Promise<void> {
    await this.prisma.product.upsert({
      where: { id: product.id ?? -1 },
      update: product,
      create: product,
    });
  }

  async obter(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    return products as any;
  }

  async obterPorId(id: number): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    return (product as any) ?? null;
  }

  async excluir(id: number): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}

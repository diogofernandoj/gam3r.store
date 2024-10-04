import { Injectable } from '@nestjs/common';
import { Order } from '@gstore/core';
import { PrismaProvider } from '../db/prisma.provider';

@Injectable()
export class OrderPrisma {
  constructor(private readonly prisma: PrismaProvider) {}

  async getOrdersRepository(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany();
    return orders as any;
  }
  async getOrderByIdRepository(id: number): Promise<Order[]> {
    const orders = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: { product: { select: { id: true, name: true } } },
        },
        delivery: true,
      },
    });
    return orders as any;
  }

  async saveOrderRepository(order: Order): Promise<void> {
    await this.prisma.order.create({
      data: {
        date: order.date,
        status: order.status,
        total_amount: order.total_amount,
        payment_method: order.payment_method,
        delivery: { create: { ...order.delivery } },
        items: {
          create: order.items.map((item) => ({
            product_id: item.product.id,
            unit_price: item.unit_price,
            quantity: item.quantity,
          })),
        },
      },
    });
  }

  async deleteOrderRepository(id: number): Promise<void> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) return;
    await this.prisma.$transaction([
      this.prisma.orderItem.deleteMany({ where: { order_id: id } }),
      this.prisma.order.delete({ where: { id } }),
      this.prisma.deliveryOrder.delete({ where: { id: order.delivery_id } }),
    ]);
  }
}

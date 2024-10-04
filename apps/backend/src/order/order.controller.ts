import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderPrisma } from './order.prisma';
import { Order } from '@gstore/core';

@Controller('orders')
export class OrderController {
  constructor(private readonly repository: OrderPrisma) {}

  @Post()
  async saveOrder(@Body() order: Order) {
    return this.repository.saveOrderRepository(order);
  }

  @Get()
  async getOrders() {
    return this.repository.getOrdersRepository();
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.repository.getOrderByIdRepository(+id);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return this.repository.deleteOrderRepository(+id);
  }
}

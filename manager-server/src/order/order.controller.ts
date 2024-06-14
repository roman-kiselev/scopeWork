import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    @Inject('ORDER_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get('/')
  async getAll() {
    const response = await firstValueFrom(this.client.send('hello', 'query'));

    // console.log(response);
    return JSON.parse(response);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { uniqueId } from "lodash";
import { instance } from "src/razor.config";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create() {
    const options = {
      amount: 500,
      currency: "INR",
      receipt: "orderId - " + uniqueId(),
    };
    const response = await instance.orders.create(options);
    return response;
  }
}

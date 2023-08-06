import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  Delete,
  HttpStatus,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto"; // You should define this DTO

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateProductDto: CreateProductDto
  ) {
    return await this.productsService.update(id, updateProductDto);
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.productsService.findOne(id);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.productsService.remove(id);
  }
}

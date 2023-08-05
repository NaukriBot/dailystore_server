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
import { ProductCategoriesService } from "./product-categories.service";
import { CreateProductCategoryDto } from "./dto/create-product-category.dto";

@Controller("product-categories")
export class ProductCategoriesController {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService
  ) {}

  @Post()
  async create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return await this.productCategoriesService.create(createProductCategoryDto);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateProductCategoryDto: CreateProductCategoryDto
  ) {
    return await this.productCategoriesService.update(
      id,
      updateProductCategoryDto
    );
  }

  @Get()
  async findAll() {
    return await this.productCategoriesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.productCategoriesService.findOne(id);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.productCategoriesService.remove(id);
  }
}

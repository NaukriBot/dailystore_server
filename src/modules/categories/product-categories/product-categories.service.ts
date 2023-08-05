import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  ProductCategory,
  ProductCategoryDocument,
} from "./entities/product-category.entity";
import { CreateProductCategoryDto } from "./dto/create-product-category.dto";

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectModel(ProductCategory.name)
    private readonly productCategoryModel: Model<ProductCategoryDocument>
  ) {}

  async create(
    createProductCategoryDto: CreateProductCategoryDto
  ): Promise<ProductCategory> {
    const createdCategory = new this.productCategoryModel(
      createProductCategoryDto
    );
    return await createdCategory.save();
  }

  async findAll(): Promise<ProductCategory[]> {
    return await this.productCategoryModel
      .find()
      .populate({
        path: "categoryInfo",
        model: "ProductCategory",
        select: "name",
      })
      .exec();
  }

  async findOne(id: string): Promise<ProductCategory> {
    const category = await this.productCategoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category not found for ID ${id}`);
    }
    return category;
  }

  async update(
    id: string,
    updateProductCategoryDto: CreateProductCategoryDto
  ): Promise<ProductCategory> {
    const updatedCategory = await this.productCategoryModel.findByIdAndUpdate(
      id,
      updateProductCategoryDto,
      {
        new: true,
      }
    );
    if (!updatedCategory) {
      throw new NotFoundException(`Category not found for ID ${id}`);
    }
    return updatedCategory;
  }

  async remove(id: string): Promise<ProductCategory> {
    const deletedCategory = await this.productCategoryModel.findByIdAndRemove(
      id
    );
    if (!deletedCategory) {
      throw new NotFoundException(`Category not found for ID ${id}`);
    }
    return deletedCategory;
  }
}

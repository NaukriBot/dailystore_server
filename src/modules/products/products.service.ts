import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "./entities/product.entity"; // Update the path accordingly
import { CreateProductDto } from "./dto/create-product.dto"; // Update the path accordingly

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return await createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel
      .find()
      .populate({
        path: "categoryInfo",
        model: "ProductCategory", // This assumes a product references its category similarly as before
        select: "name",
      })
      .exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product not found for ID ${id}`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: CreateProductDto
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      throw new NotFoundException(`Product not found for ID ${id}`);
    }
    return updatedProduct;
  }

  async remove(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndRemove(id);
    if (!deletedProduct) {
      throw new NotFoundException(`Product not found for ID ${id}`);
    }
    return deletedProduct;
  }
}

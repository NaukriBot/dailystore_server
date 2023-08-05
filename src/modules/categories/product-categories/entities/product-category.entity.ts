import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class ProductCategory extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true, enum: ["active", "inactive", "draft", "archived"] })
  status: string;

  @Prop({ type: Types.ObjectId, ref: ProductCategory.name, required: false })
  categoryId: Types.ObjectId;
}

export const ProductCategorySchema =
  SchemaFactory.createForClass(ProductCategory);

export type ProductCategoryDocument = ProductCategory & Document; // Exporting the type

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ProductCategory } from "src/modules/categories/product-categories/entities/product-category.entity";

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      if (ret.categoryInfo === null) {
        delete ret.categoryInfo;
      }
      return ret;
    },
  },
  toObject: { virtuals: true },
})
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true, type: Types.ObjectId, ref: ProductCategory.name })
  categoryId: Types.ObjectId;

  @Prop({ required: true, enum: ["active", "inactive", "draft", "archived"] })
  status: string;

  @Prop({ required: true, type: String })
  costPrice: string;

  @Prop({ required: true, type: String })
  sellingPrice: string;

  @Prop({ required: true, type: String })
  discountedPrice: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

export type ProductDocument = Product & Document; // Exporting the type

// Define a virtual property named 'categoryInfo' on the product schema
ProductSchema.virtual("categoryInfo", {
  ref: "ProductCategory",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

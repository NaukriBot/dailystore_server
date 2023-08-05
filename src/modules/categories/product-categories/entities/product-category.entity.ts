import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

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

// Define a virtual property named 'customRooms' on the hotel schema
ProductCategorySchema.virtual("categoryInfo", {
  ref: "ProductCategory",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

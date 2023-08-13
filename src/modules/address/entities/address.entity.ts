import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Address extends Document {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop()
  title: string;

  @Prop()
  name: string;

  @Prop()
  address1: string;

  @Prop({ required: false })
  address2?: string;

  @Prop({ required: false })
  landmark?: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop()
  postalCode: string;

  @Prop({ default: false })
  isDefault: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

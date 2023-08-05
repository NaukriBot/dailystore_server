import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Files extends Document {
  @Prop()
  bucket: string;

  @Prop()
  location: string;

  @Prop()
  pkey: string;

  @Prop()
  skey: string;

  @Prop()
  originalname: string;

  @Prop()
  mimetype: string;

  @Prop()
  size: number;

  @Prop()
  url: string;
}

export const FilesSchema = SchemaFactory.createForClass(Files);

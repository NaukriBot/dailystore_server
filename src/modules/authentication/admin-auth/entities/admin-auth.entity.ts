import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class AdminAuth extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  parentId?: string;

  @Prop({ unique: true, sparse: true })
  refreshToken?: string;

  // ... other admin-specific fields ...
}

export const AdminAuthSchema = SchemaFactory.createForClass(AdminAuth);

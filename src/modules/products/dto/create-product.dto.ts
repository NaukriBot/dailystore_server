import {
  IsString,
  IsOptional,
  IsIn,
  IsMongoId,
  IsNumber,
} from "class-validator";
import { CategoryStatus } from "src/core/enums/category-status.enum";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsMongoId()
  categoryId: string;

  @IsString()
  @IsIn(Object.values(CategoryStatus))
  status: CategoryStatus;

  @IsString()
  costPrice: string;

  @IsString()
  sellingPrice: string;

  @IsString()
  discountedPrice: string;
}

import { IsString, IsOptional, IsIn, IsMongoId } from "class-validator";
import { CategoryStatus } from "src/core/enums/category-status.enum";

export class CreateProductCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsMongoId()
  categoryId?: string;

  @IsString()
  @IsIn(Object.values(CategoryStatus))
  status: CategoryStatus;
}

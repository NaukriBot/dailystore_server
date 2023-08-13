import { IsString, IsOptional, IsMongoId } from "class-validator";

export class CreateAddressDto {
  @IsMongoId()
  userId: string;

  @IsString()
  title: string;

  @IsString()
  name: string;

  @IsString()
  address1: string;

  @IsString()
  @IsOptional()
  address2?: string;

  @IsString()
  @IsOptional()
  landmark?: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsString()
  pincode: string;
}

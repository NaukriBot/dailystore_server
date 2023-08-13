import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { AddressService } from "./address.service";
import { CreateAddressDto } from "./dto/create-address.dto";

@Controller("users/:userId/address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async createAddress(@Body() dto: CreateAddressDto) {
    return this.addressService.createAddress(dto);
  }

  @Get()
  async getAllAddresses(@Param("userId") userId: string) {
    return this.addressService.getAddressByUserId(userId);
  }

  @Get(":addressId")
  async getSpecificAddress(@Param("addressId") addressId: string) {
    return this.addressService.getAddressById(addressId);
  }

  @Put(":addressId")
  async updateAddress(
    @Param("addressId") addressId: string,
    @Body() dto: CreateAddressDto
  ) {
    return this.addressService.updateAddress(addressId, dto);
  }

  @Delete(":addressId")
  async deleteAddress(@Param("addressId") addressId: string) {
    return this.addressService.deleteAddress(addressId);
  }
}

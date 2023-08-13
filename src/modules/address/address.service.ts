import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateAddressDto } from "./dto/create-address.dto";
import { Address } from "./entities/address.entity";

@Injectable()
export class AddressService {
  constructor(
    @InjectModel("Address") private readonly addressModel: Model<Address>
  ) {}

  async createAddress(dto: CreateAddressDto): Promise<Address> {
    const newAddress = new this.addressModel(dto);
    return newAddress.save();
  }

  async getAddressByUserId(userId: string): Promise<Address[]> {
    return this.addressModel.find({ userId }).exec();
  }

  async getAddressById(addressId: string): Promise<Address | null> {
    return this.addressModel.findById(addressId).exec();
  }

  async updateAddress(
    addressId: string,
    dto: CreateAddressDto
  ): Promise<Address> {
    return this.addressModel
      .findByIdAndUpdate(addressId, dto, { new: true })
      .exec();
  }

  async deleteAddress(addressId: string): Promise<Address> {
    return this.addressModel.findByIdAndRemove(addressId).exec();
  }
}

import { PartialType } from "@nestjs/mapped-types";
import { CreateAdminDto } from "./create-admin-auth.dto";

export class UpdateAdminAuthDto extends PartialType(CreateAdminDto) {}

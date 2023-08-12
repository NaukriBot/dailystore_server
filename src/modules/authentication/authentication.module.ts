import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { AdminAuthModule } from "./admin-auth/admin-auth.module";

@Module({
  controllers: [AuthenticationController],
  providers: [],
  imports: [AdminAuthModule],
})
export class AuthenticationModule {}

import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Req,
} from "@nestjs/common";
import { AdminAuthService } from "./admin-auth.service";
import {
  CreateAdminDto,
  LoginAdminDto,
  LoginResponseDto,
  RefreshTokenDto,
} from "./dto/create-admin-auth.dto";

@Controller("admin-auth")
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post("register")
  async register(@Body() createAdminDto: CreateAdminDto): Promise<any> {
    const registeredAdmin = await this.adminAuthService.register(
      createAdminDto
    );
    if (!registeredAdmin) {
      throw new HttpException(
        "Failed to register admin",
        HttpStatus.BAD_REQUEST
      );
    }
    return {
      message: "Admin registered successfully",
      data: registeredAdmin,
    };
  }

  @Post("login")
  async login(@Body() loginAdminDto: LoginAdminDto): Promise<LoginResponseDto> {
    const { email, password } = loginAdminDto;
    const admin = await this.adminAuthService.findByEmail(email);
    if (!admin) {
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await this.adminAuthService.validateAdminPassword(
      email,
      password
    );
    if (!isPasswordValid) {
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    return this.adminAuthService.login(admin);
  }

  @Post("refresh")
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto
  ): Promise<LoginResponseDto> {
    return this.adminAuthService.refreshToken(refreshTokenDto.refresh_token);
  }

  @Post("logout")
  async logout(
    @Body() refreshTokenDto: RefreshTokenDto
  ): Promise<{ message: string }> {
    await this.adminAuthService.invalidateRefreshToken(
      refreshTokenDto.refresh_token
    );
    return { message: "Logged out successfully" };
  }
}

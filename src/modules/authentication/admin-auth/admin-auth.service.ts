import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { AdminAuth } from "./entities/admin-auth.entity";
import { CreateAdminDto } from "./dto/create-admin-auth.dto";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectModel(AdminAuth.name) private readonly adminModel: Model<AdminAuth>,
    private readonly jwtService: JwtService
  ) {}

  async register(createAdminDto: CreateAdminDto): Promise<AdminAuth> {
    const { email, password } = createAdminDto;
    const existingAdmin = await this.adminModel.findOne({ email }).exec();
    if (existingAdmin) {
      throw new HttpException("Admin already exists", HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new this.adminModel({
      ...createAdminDto,
      password: hashedPassword,
    });
    return newAdmin.save();
  }

  async findByEmail(email: string): Promise<AdminAuth | null> {
    return this.adminModel.findOne({ email }).exec();
  }

  async validateAdminPassword(
    email: string,
    plainPassword: string
  ): Promise<boolean> {
    const admin = await this.findByEmail(email);
    if (!admin) return false;
    return bcrypt.compare(plainPassword, admin.password);
  }

  async login(admin: AdminAuth): Promise<any> {
    const payload = { email: admin.email, sub: admin._id };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = await this.generateRefreshToken(admin);
    return {
      user: {
        tokenType: "Bearer",
        expires_in: 3600,
        userId: admin._id,
        name: admin.name,
        email: admin.email,
        sessionId: access_token,
        refreshToken: refresh_token,
      },
    };
  }

  async generateRefreshToken(admin: AdminAuth): Promise<string> {
    const refreshToken = uuidv4();
    admin.refreshToken = refreshToken;
    await admin.save();
    return refreshToken;
  }

  async refreshToken(refreshToken: string): Promise<any> {
    const admin = await this.adminModel.findOne({ refreshToken }).exec();
    if (!admin) {
      throw new HttpException("Invalid refresh token", HttpStatus.UNAUTHORIZED);
    }
    const payload = { email: admin.email, sub: admin._id };
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
      token_type: "Bearer",
      expires_in: 3600,
    };
  }

  async invalidateRefreshToken(refreshToken: string): Promise<void> {
    const admin = await this.adminModel.findOne({ refreshToken }).exec();
    if (admin) {
      admin.refreshToken = null;
      await admin.save();
    }
  }
}

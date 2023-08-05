import {
  Controller,
  Post,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from "@nestjs/common";
import { FilesService } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Files } from "./schemas/file.schema";
import { ApiResponse } from "src/interfaces/api-response.interface";

@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File
  ): Promise<ApiResponse> {
    try {
      const files: string = await this.filesService.uploadFile(file);
      return {
        status: "success",
        message: "File uploaded successfully",
        data: files,
      };
    } catch (error) {
      return {
        status: "error",
        message: "Failed to upload file",
        error: error.message,
      };
    }
  }

  @Delete()
  async deleteFileByUrl(
    @Query("fileUrl") fileUrl: string
  ): Promise<ApiResponse> {
    try {
      await this.filesService.deleteFile(fileUrl);
      return {
        status: "success",
        message: "Files deleted successfully",
      };
    } catch (error) {
      return {
        status: "error",
        message: "Failed to delete files",
        error: error.message,
      };
    }
  }
}

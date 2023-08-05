import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Files, FilesSchema } from "./schemas/file.schema";

@Module({
  controllers: [FilesController],
  imports: [
    MongooseModule.forFeature([{ name: Files.name, schema: FilesSchema }]),
  ],
  providers: [FilesService],
})
export class FilesModule {}

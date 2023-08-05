import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { s3 } from "src/aws.config";
import { Files } from "./schemas/file.schema";
import * as mime from "mime-types";
import { extname } from "path";

@Injectable()
export class FilesService {
  constructor(@InjectModel(Files.name) private fileModel: Model<Files>) {}

  async uploadFile(file: Express.Multer.File) {
    try {
      const key = uuidv4();
      const ext = mime.extension(file.mimetype);
      const extName = ext ? `.${ext}` : extname(file.mimetype);
      const result = await s3
        .upload({
          Bucket: process.env.SPACES_BUCKET,
          Key: `test/${key}${extName}`,
          Body: file.buffer,
          ACL: "public-read",
        })
        .promise();

      const createdFile = await new this.fileModel({
        bucket: result.Bucket,
        location: result.Location,
        pkey: result.Key,
        skey: `${key}${extName}`,
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      });
      const { location } = await createdFile.save();
      return location;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteFile(fileUrl: string) {
    try {
      const filekeyList = fileUrl.split("/");
      const filekey = filekeyList[filekeyList.length - 1];

      const result = await s3
        .deleteObject({
          Bucket: process.env.SPACES_BUCKET,
          Key: `dyno/${filekey}`,
        })
        .promise();
      const deleteFile = await this.fileModel.findOneAndDelete({
        fileUrl: fileUrl,
      });
      return deleteFile;
    } catch (error) {
      throw new Error("Error deleting files");
    }
  }
}

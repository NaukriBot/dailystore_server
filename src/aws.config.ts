// import { Config } from "aws-sdk/lib/config";
import * as AWS from "aws-sdk";
export const s3 = new AWS.S3({
  endpoint: "https://sgp1.digitaloceanspaces.com",
  accessKeyId: "accessKeyId",
  secretAccessKey: "secretAccessKey",
});

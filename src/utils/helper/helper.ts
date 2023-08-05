import axios from "axios";
import { s3 } from "src/aws.config";
import * as bcrypt from "bcrypt";

export const uploadHTMLContent = async (data, path, fileName) => {
  const key = `dyno/htmlfiles/${path}/${fileName}.html`;
  const uploadParams = {
    Bucket: process.env.SPACES_BUCKET,
    Key: key,
    Body: data,
    ACL: "public-read",
  };

  const result = await s3.upload(uploadParams).promise();
  return result.Location;
};

export const extractHTMLContent = async (fileUrl) => {
  const response = await axios.get(fileUrl);
  return response.data;
};

export const generatePassword = async (password: string) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

export const checkPassword = async (password: string, userPassword: string) => {
  return await bcrypt.compare(password, userPassword);
};

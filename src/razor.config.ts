// import { Config } from "aws-sdk/lib/config";
import Razorpay from "razorpay";

export const instance = new Razorpay({
  key_id: "accessKeyId",
  key_secret: "secretAccessKey",
});

// export const s3 = new AWS.S3({
//   endpoint: "https://sgp1.digitaloceanspaces.com",
//   accessKeyId: "accessKeyId",
//   secretAccessKey: "secretAccessKey",
// });

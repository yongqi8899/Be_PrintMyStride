import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINSRY_CLOUD_NAME,
  api_key: process.env.CLOUDINSRY_API_KEY,
  api_secret: process.env.CLOUDINSRY_API_SECRET,
});
export default cloudinary;
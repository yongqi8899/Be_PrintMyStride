import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINSRY_CLOUD_NAME,
  api_key: process.env.CLOUDINSRY_API_KEY,
  api_secret: process.env.CLOUDINSRY_API_SECRET,
});

const url = cloudinary.url("sample.jpg", {
  transformation: [
    { fetch_format: "auto"},
    { quality: "auto" },
  ],
}); 

(async () => {
  try {
    const result = await cloudinary.uploader.upload("./uploads/ee495e40ace39e3a407b516c946ed8ff", {
      upload_preset: "preset1",
    });
    console.log(result);
    const url = cloudinary.url(result.public_id, {
      transformation: [
        { fetch_format: "auto",  quality: "auto"},
        { width: 400, height: 400, crop: "fill", gravity: "auto" },
      ],
    });
  } catch (error) {
    console.error(error);
  }
})
export default cloudinary;
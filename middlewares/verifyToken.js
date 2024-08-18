import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  const cookies =
    req.headers.cookie?.split(";").map((cookie) => cookie.trim()) || [];
  const cookiesObj = cookies.reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = value;
    return acc;
  }, {});
  const token = cookiesObj.token;
  if (!token)
    return res.status(401).json({ error: "Unauthorized. Please sign in" });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decoded.id;
  next();
});

export default verifyToken;

import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  const {
    headers: { authorization },
  } = req;
  if (!authorization) throw new Error("Please login to access this resource", 401);
  const authToken = authorization.split(" ")[1];
  console.log("verifyToken.js: authorization: ", authToken);
  if (!authToken) return res.status(401).json({ error: "Unauthorized. Please sign in" });
  const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
  req.userId = decoded.id;
  next();
});

export default verifyToken;
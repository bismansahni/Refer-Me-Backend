import jwt from "jsonwebtoken";
import User from "../models/user_model.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ error: "Token is not valid" });
  }
};

export default authMiddleware;

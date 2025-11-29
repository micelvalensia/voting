import jwt from "jsonwebtoken";
import { logger } from "../application/logging.js";
import { prismaClient } from "../application/database.js";

export const generateTokenJWT = (request) => {
  const token = jwt.sign(
    {
      id: request.id,
      username: request.username,
      name: request.name,
    },
    process.env.SECRET_JWT,
    { expiresIn: "1h" }
  );

  return { token };
};

export const authenticateToken = async (req, res, next) => {
  try {
    // Ambil token dari header Authorization
    const token = req.cookies.token;
    console.log("Disini");
    console.log(token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token required",
      });
    }

    // Verifikasi token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("here decocde", decoded);

    // Cari user berdasarkan ID dari token
    const user = await prismaClient.users.findUnique(decoded.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token - user not found",
      });
    }

    // Tambahkan user ke request object
    req.user = {
      ...user.toJSON(),
    };
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication error",
      error: error.message,
    });
  }
};

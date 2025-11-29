import { prismaClient } from "../application/database.js";
import {
  userLoginValidation,
  userRegisterValidation,
} from "../validation/user-validation.js";
import bcrypt from "bcrypt";
import AppError from "../middleware/errorHandler.js";
import { validate } from "../validation/validation.js";
import { generateTokenJWT } from "../middleware/authmiddleware.js";

const register = async (request) => {
  const registerRequest = validate(userRegisterValidation, request);

  const existing = await prismaClient.users.findUnique({
    where: { username: registerRequest.username },
  });

  if (existing) {
    throw new AppError("Username telah digunakan", 400);
  }

  const hashedPassword = await bcrypt.hash(registerRequest.password, 10);

  const createdUser = await prismaClient.users.create({
    data: {
      username: registerRequest.username,
      name: registerRequest.name,
      email: registerRequest.email,
      password: hashedPassword,
    },
  });

  return {
    username: createdUser.username,
  };
};

const login = async (request) => {
  const loginRequest = validate(userLoginValidation, request);

  const user = await prismaClient.users.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      password: true,
    },
  });

  if (!user) {
    throw new AppError("Username tidak ditemukan", 401);
  }

  const isPasswordValid = bcrypt.compare(loginRequest.password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Password salah", 401);
  }

  const token = generateTokenJWT(user);

  return token;
};

export default {
  register,
  login,
};

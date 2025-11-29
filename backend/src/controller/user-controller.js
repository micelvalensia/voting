import userService from "../service/user-service.js";

const register = async (req, res, next) => {
  try {
    console.log("BODY:", req.body);

    const result = await userService.register(req.body);
    res.status(200).json({
      data: result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.cookie("token", result, {
      httpOnly: true,
      secure: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
      sameSite: "none",
    });
    res.status(200).json({ data: result, success: true });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
};

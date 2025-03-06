import { Request, Response, NextFunction } from "express";
import { userSignupSchema } from "../validations/auth";
import { loginUserService, registerUserService } from "../services/authService";

export async function registerUser(req: any, res: any, next: any) {
  try {
    const { error, value } = userSignupSchema.validate(req.body);
    console.log("registerUser value data ", value);
    if (error) {
      return res.status(400).json({ status: "error", data: error.details });
    }
    console.log(`value `, value);
    const registerUserResponse = await registerUserService(value);

    return res.status(200).json({ data: JSON.stringify(registerUserResponse) });
  } catch (error) {
    next(error);
  }
}

export async function loginUser(req: any, res: any, next: any) {
  try {
    const { email, password } = req.body;
    const [data, error] = await loginUserService({ email, password });
    if (error) {
      return res
        .status(400)
        .json({ message: "Invalid request", data: JSON.stringify(error) });
    }
    console.log(`data`, data);
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ error: JSON.stringify(error) });
  }
}

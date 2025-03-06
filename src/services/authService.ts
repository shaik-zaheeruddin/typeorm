// src/services/authService.ts

import { AppDataSource } from "../config/database";
import { User } from "../entity/user";
import { UserLog } from "../entity/userLog";
import { createUserLog } from "../repositories/userLogRepository";
import { createUser, findUserByEmail } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { comparePassword, generateToken, hashPassword } from "../utils/auth";
import { error } from "console";
// import { findUserByEmail } from "../repositories/userRepository";

interface RegisterUserDto {
  email: string;
  password: string;
  name: string;
  phone?: string;
  gender?: string;
}

export const registerUserService = async (userData: RegisterUserDto) => {
  const { email, password, name, phone, gender } = userData;

  // Check if the user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Transaction management
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user
    const newUser = queryRunner.manager.create(User, {
      email,
      hashed_password: hashedPassword,
      name,
      phone,
      gender,
    });

    // Save the user
    await queryRunner.manager.save(User, newUser);
    // Log the registration
    const qureylog = queryRunner.manager.create(UserLog, {
      action: "REGISTERED",
      user: {
        id: newUser.id,
      },
    });

    await queryRunner.manager.save(UserLog, qureylog);

    // Commit the transaction
    await queryRunner.commitTransaction();
    return newUser;
  } catch (error) {
    // Rollback in case of error
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

export const loginUserService = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const { email, password } = userData;

    // Find the user by email
    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      throw new Error("User does not exist");
    }

    // Validate the password using bcrypt
    const isPasswordValid = await comparePassword(
      password,
      existingUser.hashed_password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Generate a JWT token
    const token = await generateToken({
      id: existingUser.id,
      email: existingUser.email,
    });

    return [token, null];
  } catch (err) {
    return [null, err];
  }
};

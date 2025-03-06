// src/repositories/userRepository.tsx
import { AppDataSource } from "../config/database";
import { User } from "../entity/user";

const userRepository = AppDataSource.getRepository(User);

export const findUserByEmail = async (email: string) => {
  return await userRepository.findOneBy({ email });
};

export const createUser = async (userData: Partial<User>) => {
  const newUser = userRepository.create(userData);
  return await userRepository.save(newUser);
};

// src/repositories/userLogRepository.ts

import { AppDataSource } from "../config/database";
import { UserLog } from "../entity/userLog";

const userLogRepository = AppDataSource.getRepository(UserLog);

export const createUserLog = async (action: string, userId: string) => {
  const log = userLogRepository.create({ action, user: { id: userId } });
  return await userLogRepository.save(log);
};

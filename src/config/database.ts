import { DataSource } from "typeorm";
import { User } from "../entity/user"; // Adjust the path to your entity
import config from "./config.env";
import { UserLog } from "../entity/userLog";
import { Category } from "../entity/category";
import { Note } from "../entity/note";
import { NotesAuditLog } from "../entity/notesAuditLog";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.database.host,
  port: 3306,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize: false,
  logging: false,
  entities: [User, UserLog, Category, Note, NotesAuditLog],
  migrations: ["../migrations/*.ts"],
  subscribers: [],
});

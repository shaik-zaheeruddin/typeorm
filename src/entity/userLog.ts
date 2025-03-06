// src/entities/UserLog.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity()
export class UserLog {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  action!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  // Many logs can belong to one user
  @ManyToOne(() => User, (user) => user.logs, { onDelete: "CASCADE" })
  user!: User;
}

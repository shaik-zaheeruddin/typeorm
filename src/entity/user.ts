// src/entities/User.ts
import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import { UserLog } from "./userLog";
import { Note } from "./note";
import { NotesAuditLog } from "./notesAuditLog";
import { Category } from "./category";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Column()
  @IsNotEmpty()
  hashed_password!: string;

  @Column()
  @IsNotEmpty()
  name!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ default: "user" })
  role: "user" | "admin" = "user";

  @OneToMany(() => UserLog, (log) => log.user)
  logs!: UserLog[];

  @OneToMany(() => Note, (note) => note.user)
  notes!: Note[];

  @OneToMany(() => Category, (category) => category.user)
  categories!: Category[];

  @OneToMany(() => NotesAuditLog, (log) => log.user)
  auditLogs!: NotesAuditLog[];

  @Column({ nullable: true })
  country_code?: string;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user";
import { Note } from "./note";

@Entity("notes_audit_logs")
export class NotesAuditLog {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  action!: string; // e.g., 'CREATE', 'UPDATE', 'DELETE'

  @Column("json", { nullable: true })
  data?: object; // Store old note data as JSON in MySQL

  @ManyToOne(() => User, (user) => user.auditLogs, { onDelete: "SET NULL" })
  user!: User;

  @ManyToOne(() => Note, (note) => note.auditLogs, { onDelete: "CASCADE" })
  note!: Note;

  @CreateDateColumn()
  created_at!: Date;
}

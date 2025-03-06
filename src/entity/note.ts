import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from "typeorm";
import { Category } from "./category";
import { User } from "./user";
import { NotesAuditLog } from "./notesAuditLog";

@Entity("notes")
export class Note {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column("text")
  content!: string;

  @Column({ default: false })
  delete!: boolean;

  @ManyToOne(() => Category, (category) => category.notes, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "category_id" })
  category!: Category;

  @ManyToOne(() => User, (user) => user.notes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToMany(() => NotesAuditLog, (log) => log.note)
  auditLogs!: NotesAuditLog[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at?: Date; // Soft delete support
}

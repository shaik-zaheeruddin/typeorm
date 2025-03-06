import express from "express";
import config from "./config/config.env";
import { AppDataSource } from "./config/database";
import { loginUser, registerUser } from "./controllers/authController";
import { isAuthenticated } from "./middleware/auth";
import {
  createNewNote,
  getAllNotes,
  getNoteById,
} from "./controllers/noteController";
import { createNewCategory } from "./controllers/categoryController";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Error during Data:", err.message);
  });

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/auth/register", registerUser);
app.post("/auth/login", loginUser);

// notes management
// Category Routes
app.post("/categories", [isAuthenticated, createNewCategory]);
app.get("/categories", [isAuthenticated]);
app.get("/categories/:id", [isAuthenticated]);
app.put("/categories/:id", [isAuthenticated]);
app.delete("/categories/:id", [isAuthenticated]);

// Note Routes
app.post("/notes", [isAuthenticated, createNewNote]);
app.get("/notes", [isAuthenticated, getAllNotes]);
app.get("/notes/:id", [isAuthenticated, getNoteById]);
app.put("/notes/:id", [isAuthenticated]);
app.delete("/notes/:id", [isAuthenticated]);
app.get("/categories/:id/notes", [isAuthenticated]);

// Additional Routes (Optional)
app.get("/notes/search", [isAuthenticated]);
app.patch("/notes/:id/mark-complete", [isAuthenticated]);
app.get("/notes/recent", [isAuthenticated]);

const PORT = config.server.port || 3000;

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server  on http://localhost:${PORT}`);
});

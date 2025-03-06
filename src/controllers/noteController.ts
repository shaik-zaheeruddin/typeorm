import { Request, Response } from "express";
import {
  createNote,
  searchNotes,
  findByTitle,
  findByUserId,
  deleteNote,
} from "../repositories/notesRepository";
import { Note } from "../entity/note";

// ✅ 1. Get All Notes
export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals;

    const userId = user.id;
    const notes = await findByUserId(userId);
    res.json(notes);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

// ✅ 2. Get Note by ID
export const getNoteById = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;
    const notes = await searchNotes(noteId);
    if (!notes.length) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(notes[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching note", error });
  }
};

// ✅ 3. Create a New Note
export const createNewNote = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals;

    const { title, content, category } = req.body;

    const note = await createNote(title, content, category, user.id);
    return res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
};

// ✅ 4. Update Note Title
// export const updateNote = async (req: Request, res: Response) => {
//   try {
//     const noteId = parseInt(req.params.id);
//     const { title } = req.body;
//     const updatedNote = await updateNoteTitle(noteId, title);
//     if (!updatedNote) {
//       return res.status(404).json({ message: "Note not found" });
//     }
//     res.json(updatedNote);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating note", error });
//   }
// };

// ✅ 5. Search Notes by Title or Content
export const searchNotesByTerm = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query as { searchTerm: string };
    const notes = await searchNotes(searchTerm);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error searching notes", error });
  }
};

// ✅ 6. Delete Note by ID
export const deleteNoteById = async (req: Request, res: Response) => {
  try {
    const noteId = parseInt(req.params.id);
    const success = await deleteNote(noteId);
    if (!success) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
};

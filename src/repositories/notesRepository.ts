import { FindOptionsWhere } from "typeorm";
import { AppDataSource } from "../config/database";
import { Category } from "../entity/category";
import { Note } from "../entity/note";
import { User } from "../entity/user";

// ✅ 1. Create Note with Category
// export const createNote = async (
//   title: string,
//   content: string,
//   category: string,
//   userId: string
// ) => {
//   try {
//     const noteRepository = AppDataSource.getRepository(Note);
//     const userRepository = AppDataSource.getRepository(User);

//     // Ensure the user exists before creating a note
//     const user = await userRepository.findOne({ where: { id: userId } });
//     if (!user) {
//       console.error("User not found");
//       return null;
//     }
//     const noteData = {
//       title,
//       content,
//       category,
//       user: {
//         id: userId,
//       }, // Assign the entire user entity, not just userId
//     };
//     const note = noteRepository.create(noteData);

//     return await noteRepository.save(note);
//   } catch (error) {
//     console.error("Error creating note:", error);
//     return null;
//   }
// };

export const createNote = async (
  title: string,
  content: string,
  categoryId: string,
  userId: string
) => {
  try {
    const noteRepository = AppDataSource.getRepository(Note);
    const userRepository = AppDataSource.getRepository(User);
    const categoryRepository = AppDataSource.getRepository(Category);

    // Ensure the user exists
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      console.error("User not found");
      return null;
    }

    // Ensure the category exists
    const category = await categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      console.error("Category not found");
      return null;
    }

    // Create the note with proper entity references
    const note = noteRepository.create({
      title,
      content,
      category, // Assigning the full category entity
      user, // Assigning the full user entity
    });

    return await noteRepository.save(note);
  } catch (error) {
    console.error("Error creating note:", error);
    return null;
  }
};

// ✅ 2. Update Note Title
// export const updateNoteTitle = async (
//   noteId: number,
//   newTitle: string
// ): any => {
//   const noteRepository = AppDataSource.getRepository(Note);
//   await noteRepository.update(noteId, { title: newTitle });

//   // Fix: Explicitly define `where` condition correctly
//   return noteRepository.findOne({
//     where: { id: noteId },
//   });
// };

// ✅ 3. Search Notes by Title or Content
export const searchNotes = async (searchTerm: string): Promise<Note[]> => {
  const noteRepository = AppDataSource.getRepository(Note);
  return noteRepository
    .createQueryBuilder("note")
    .where("note.title LIKE :searchTerm", { searchTerm: `%${searchTerm}%` })
    .orWhere("note.content LIKE :searchTerm", { searchTerm: `%${searchTerm}%` })
    .getMany();
};

// ✅ 4. Find Notes by Title
export const findByTitle = async (title: string): Promise<Note[]> => {
  const noteRepository = AppDataSource.getRepository(Note);
  return noteRepository.find({ where: { title } });
};

// ✅ 5. Find Notes by User ID
export const findByUserId = async (userId: any): Promise<Note[]> => {
  const noteRepository = AppDataSource.getRepository(Note);
  const data = await noteRepository.find({
    // loadRelationIds: true,
    where: { user: { id: userId } } as any, // Explicitly cast if needed
    relations: ["user"], // Ensure user relation is loaded
    order: { created_at: "DESC" },
  });
  return data;
};

// ✅ 6. Delete Note by ID
export const deleteNote = async (noteId: number): Promise<boolean> => {
  const noteRepository = AppDataSource.getRepository(Note);
  const result = await noteRepository.delete(noteId);
  return result.affected ? true : false;
};

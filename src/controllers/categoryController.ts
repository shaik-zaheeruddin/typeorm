import { Request, Response } from "express";
import { Category } from "../entity/category";
import {
  createCategory,
  //   updateCategoryName,
  getAllCategories,
  //   getCategoryById,
  deleteCategory,
} from "../repositories/categoryRepository";

// ✅ 1. Create a New Category
export const createNewCategory = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals;
    const { name } = req.body;
    const category = await createCategory(name, user.id);
    res.status(201).json({ data: category });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Error creating category", error });
  }
};

// // ✅ 2. Update Category Name
// export const updateCategory = async (req: Request, res: Response) => {
//   try {
//     const categoryId = parseInt(req.params.id);
//     const { name } = req.body;
//     const updatedCategory = await updateCategoryName(categoryId, name);
//     if (!updatedCategory) {
//       return res.status(404).json({ message: "Category not found" });
//     }
//     res.json(updatedCategory);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating category", error });
//   }
// };

// ✅ 3. Get All Categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// ✅ 4. Get Category by ID
// export const getCategoryByIdController = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const categoryId = parseInt(req.params.id);
//     const category = await getCategoryById(categoryId);
//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }
//     res.json(category);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching category", error });
//   }
// };

// ✅ 5. Delete Category by ID
export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.id);
    const success = await deleteCategory(categoryId);
    if (!success) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};

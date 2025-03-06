import { getRepository } from "typeorm";
import { Category } from "../entity/category";
import { AppDataSource } from "../config/database";
import { User } from "../entity/user";

// ✅ 1. Create Category
export const createCategory = async (
  name: string,
  userId: string
): Promise<Category> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error("User not found");
  }

  const categoryRepository = AppDataSource.getRepository(Category);
  const category = categoryRepository.create({ name });
  return categoryRepository.save(category);
};

// ✅ 2. Update Category Name
// export const updateCategoryName = async (
//   categoryId: number,
//   name: string
// ): Promise<Category | null> => {
//   const categoryRepository = getRepository(Category);
//   await categoryRepository.update(categoryId, { name });
//   return categoryRepository.findOne({ where: { id: categoryId } });
// };

// ✅ 3. Get All Categories
export const getAllCategories = async (): Promise<Category[]> => {
  const categoryRepository = AppDataSource.getRepository(Category);
  return categoryRepository.find();
};

// ✅ 4. Get Category by ID
// export const getCategoryById = async (
//   categoryId: number
// ): Promise<Category | null> => {
//   const categoryRepository = getRepository(Category);
//   return categoryRepository.findOne({ where: { id: categoryId } });
// };

// ✅ 5. Delete Category
export const deleteCategory = async (categoryId: number): Promise<boolean> => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const result = await categoryRepository.delete(categoryId);
  return result.affected ? true : false;
};

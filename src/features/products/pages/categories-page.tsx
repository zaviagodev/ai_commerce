import { useNavigate } from "react-router-dom";
import { CategoryList } from "../components/category-list";
import { useCategories } from "../hooks/use-categories";

export function CategoriesPage() {
  const navigate = useNavigate();
  const { categories, isLoading, deleteCategory } = useCategories();

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory.mutateAsync(id);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <CategoryList
      categories={categories}
      isLoading={isLoading}
      onDelete={handleDelete}
    />
  );
}

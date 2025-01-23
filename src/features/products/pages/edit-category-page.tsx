import { useParams, useNavigate } from "react-router-dom";
import { CategoryForm } from "../components/category-form";
import { ProductCategory } from "@/types/product";
import { useCategories } from "../hooks/use-categories";

export function EditCategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, updateCategory } = useCategories();
  const category = categories.find((c) => c.id === id);

  if (!category) {
    return <div>Category not found</div>;
  }

  const handleSubmit = async (data: ProductCategory) => {
    try {
      await updateCategory.mutateAsync({ id, data });
      navigate("/dashboard/categories");
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  return <CategoryForm initialData={category} onSubmit={handleSubmit} />;
}

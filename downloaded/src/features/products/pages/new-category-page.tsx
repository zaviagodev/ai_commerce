import { useNavigate } from 'react-router-dom';
import { CategoryForm } from '../components/category-form';
import { ProductCategory } from '@/types/product';
import { useCategories } from '../hooks/use-categories';

export function NewCategoryPage() {
  const navigate = useNavigate();
  const { createCategory } = useCategories();

  const handleSubmit = async (data: ProductCategory) => {
    try {
      await createCategory.mutateAsync(data);
      navigate('/dashboard/products/categories');
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  return <CategoryForm onSubmit={handleSubmit} />;
}
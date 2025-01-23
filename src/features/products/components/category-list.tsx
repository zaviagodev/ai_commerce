import { Link, useNavigate } from "react-router-dom";
import { Plus, Folder, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductCategory } from "@/types/product";
import { DataTablePagination } from "@/components/ui/data-table/pagination";
import { usePagination } from "@/hooks/use-pagination";
import Loading from "@/components/loading";
import { useTranslation } from "@/lib/i18n/hooks";
import { ProductSearch } from "./product-search";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface CategoryListProps {
  categories: ProductCategory[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export function CategoryList({
  categories,
  isLoading,
  onDelete,
}: CategoryListProps) {
  const navigate = useNavigate();
  const t = useTranslation();
  const {
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    paginateItems,
    pageCount,
  } = usePagination();

  const [searchQuery, setSearchQuery] = useState("");
  const filteredCategories = useMemo(() => {
    let filtered = categories;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = categories.filter(
        (category) =>
          category.name.toLowerCase().includes(query) ||
          category.slug.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [categories, searchQuery]);

  const paginatedCategories = paginateItems(filteredCategories);

  if (isLoading) {
    return (
      <div className="pt-14">
        <Loading />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <motion.div
        className="flex items-center justify-between -mx-6 py-3 px-6 sticky top-0 z-10 pt-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-2xl font-semibold">
            {t.products.products.categories.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t.products.products.categories.description}
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/categories/new">
            <Plus className="mr-2 h-4 w-4" />
            {t.products.products.categories.actions.add}
          </Link>
        </Button>
      </motion.div>

      <motion.div
        className="flex items-center justify-end gap-4 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <ProductSearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t.products.products.categories.list.search}
        />
      </motion.div>

      <motion.div
        className="rounded-lg border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Table
          className={paginatedCategories.length > 0 ? "rounded-b-none" : ""}
        >
          <TableHeader>
            <TableRow>
              <TableHead>
                {t.products.products.categories.list.columns.category}
              </TableHead>
              <TableHead>
                {t.products.products.categories.list.columns.slug}
              </TableHead>
              <TableHead>
                {t.products.products.categories.list.columns.description}
              </TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-medium">
                      {t.products.products.categories.list.empty.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t.products.products.categories.list.empty.description}
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/dashboard/categories/new">
                        <Plus className="mr-2 h-4 w-4" />
                        {t.products.products.categories.actions.add}
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedCategories.map((category) => (
                <TableRow
                  key={category.id}
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(`/dashboard/categories/${category.id}`)
                  }
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                        <Folder className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="font-medium hover:underline">
                        {category.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {category.description}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/dashboard/categories/${category.id}`}>
                            {t.products.products.categories.actions.edit}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => onDelete(category.id)}
                        >
                          {t.products.products.categories.actions.delete}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <motion.div
          className={cn("border-t p-4 bg-main rounded-b-lg", {
            hidden: paginatedCategories.length === 0,
          })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <DataTablePagination
            pageIndex={pageIndex}
            pageSize={pageSize}
            pageCount={pageCount(categories.length)}
            totalItems={categories.length}
            onPageChange={setPageIndex}
            onPageSizeChange={setPageSize}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Archive, ChevronDown, Trash2, FolderInput } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/hooks';

interface BulkActionsMenuProps {
  selectedCount: number;
  onArchive: () => void;
  onDelete: () => void;
  onChangeCategory: () => void;
  disabled?: boolean;
}

export function BulkActionsMenu({
  selectedCount,
  onArchive,
  onDelete,
  onChangeCategory,
  disabled,
}: BulkActionsMenuProps) {
  const t = useTranslation();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={disabled}>
          {t.products.products.bulk.mode} ({selectedCount})
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onArchive}>
          <Archive className="mr-2 h-4 w-4" />
          {t.products.products.bulk.actions.archive}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onChangeCategory}>
          <FolderInput className="mr-2 h-4 w-4" />
          {t.products.products.bulk.actions.changeCategory}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onDelete}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {t.products.products.bulk.actions.delete}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Archive, ChevronDown, Trash2, FolderInput } from 'lucide-react';

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={disabled}>
          Bulk Actions ({selectedCount})
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onArchive}>
          <Archive className="mr-2 h-4 w-4" />
          Archive Selected
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onChangeCategory}>
          <FolderInput className="mr-2 h-4 w-4" />
          Change Category
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onDelete}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Selected
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
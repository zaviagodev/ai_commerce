import { Link } from 'react-router-dom';
import { MoreHorizontal, Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useCustomerGroups } from '../hooks/use-customer-groups';
import Loading from '@/components/loading';
import { cn } from '@/lib/utils';
import { ProductSearch } from '@/features/products/components/product-search';
import { useMemo, useState } from 'react';

export function CustomerGroupsPage() {
  const { groups, isLoading, deleteGroup } = useCustomerGroups();

  const [searchQuery, setSearchQuery] = useState('')
  const filteredGroups = useMemo(() => {
    let filtered = groups;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = groups.filter(
        (group) =>
          group.name.toLowerCase().includes(query) ||
          group.description?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [groups, searchQuery]);

  const handleDelete = async (id: string) => {
    try {
      await deleteGroup.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete group:', error);
    }
  };

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
          <h1 className="text-2xl font-semibold">Customer Groups</h1>
          <p className="text-sm text-muted-foreground">
            Organize customers into manageable groups
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/customers/groups/new">
            <Plus className="mr-2 h-4 w-4" />
            Create group
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
          placeholder="Search customer groups..."
        />
      </motion.div>

      <motion.div
        className="rounded-lg border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Group Name</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Auto-assign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGroups.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-medium">No groups found</p>
                    <p className="text-sm text-muted-foreground">
                      Get started by creating your first customer group
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/dashboard/customers/groups/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Create group
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredGroups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${group.color}-100`}
                      >
                        <Users className={`h-5 w-5 text-${group.color}-600`} />
                      </div>
                      <div>
                        <Link
                          to={`/dashboard/customers/groups/${group.id}`}
                          className="font-medium hover:underline"
                        >
                          {group.name}
                        </Link>
                        {group.description && (
                          <p className="text-sm text-muted-foreground">
                            {group.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{group.members?.length || 0} member{group.members?.length === 1 ? "" : "s"}</TableCell>
                  <TableCell>
                    <Badge variant={group.autoAssign ? 'default' : 'secondary'}>
                      {group.autoAssign ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn("capitalize shadow-none", {
                        "!bg-green-100 !text-green-700 dark:!bg-green-700 dark:!text-green-100": group.status === "active",
                        "!bg-red-100 !text-red-700 dark:!bg-red-700 dark:!text-red-100": group.status === "inactive"
                      })}
                    >
                      {group.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link
                            to={`/dashboard/customers/groups/${group.id}`}
                          >
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(group.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}

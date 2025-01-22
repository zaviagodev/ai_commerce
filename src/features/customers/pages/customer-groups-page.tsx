import { Link, useNavigate } from 'react-router-dom';
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
import { useTranslation } from '@/lib/i18n/hooks';
import { ProductSearch } from '@/features/products/components/product-search';
import { useMemo, useState } from 'react';

export function CustomerGroupsPage() {
  const navigate = useNavigate();
  const { groups, isLoading, deleteGroup } = useCustomerGroups();
  const t = useTranslation();

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
          <h1 className="text-2xl font-semibold">{t.customers.customer.group.list.title}</h1>
          <p className="text-sm text-muted-foreground">
            {t.customers.customer.group.list.description}
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/customer-groups/new">
            <Plus className="mr-2 h-4 w-4" />
            {t.customers.customer.group.list.actions.create}
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
          placeholder={t.customers.customer.group.list.search}
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
              <TableHead>{t.customers.customer.group.list.columns.name}</TableHead>
              <TableHead>{t.customers.customer.group.list.columns.members}</TableHead>
              <TableHead>{t.customers.customer.group.list.columns.autoAssign}</TableHead>
              <TableHead>{t.customers.customer.group.list.columns.status}</TableHead>
              <TableHead className="w-[70px]">{t.customers.customer.group.list.columns.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGroups.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-medium">{t.customers.customer.group.list.empty.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.customers.customer.group.list.empty.description}
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/dashboard/customer-groups/new">
                        <Plus className="mr-2 h-4 w-4" />
                        {t.customers.customer.group.list.actions.create}
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredGroups.map((group) => (
                <TableRow key={group.id} className='cursor-pointer' onClick={() => navigate(`/dashboard/customer-groups/${group.id}`)}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${group.color}-100`}
                      >
                        <Users className={`h-5 w-5 text-${group.color}-600`} />
                      </div>
                      <div>
                        <span className="font-medium hover:underline">{group.name}</span>
                        {group.description && (
                          <p className="text-sm text-muted-foreground">
                            {group.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {t.customers.customer.group.list.memberCount
                      .replace('{count}', String(group.members?.length || 0))
                      .replace('{s}', group.members?.length === 1 ? '' : 's')}
                  </TableCell>
                  <TableCell>
                    <Badge variant={group.autoAssign ? 'default' : 'secondary'}>
                      {group.autoAssign 
                        ?  t.customers.customer.group.list.autoAssign.enabled 
                        :  t.customers.customer.group.list.autoAssign.disabled}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn("capitalize shadow-none", {
                        "!bg-green-100 !text-green-700 dark:!bg-green-700 dark:!text-green-100": group.status === "active",
                        "!bg-red-100 !text-red-700 dark:!bg-red-700 dark:!text-red-100": group.status === "inactive"
                      })}
                    >
                      {t.customers.customer.group.list.status[group.status]}
                    </Badge>
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
                          <Link
                            to={`/dashboard/customer-groups/${group.id}`}
                          >
                            {t.customers.customer.group.list.actions.edit}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(group.id)}
                        >
                          {t.customers.customer.group.list.actions.delete}
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

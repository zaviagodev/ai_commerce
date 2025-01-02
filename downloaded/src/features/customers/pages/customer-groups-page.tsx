import { Link } from 'react-router-dom';
import { Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useCustomerGroups } from '../hooks/use-customer-groups';

export function CustomerGroupsPage() {
  const { groups, isLoading, deleteGroup } = useCustomerGroups();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteGroup.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete group:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
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
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Group Name</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Auto-assign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.length === 0 ? (
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
              groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${group.color}-100`}>
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
                  <TableCell>{group.members?.length || 0} members</TableCell>
                  <TableCell>
                    <Badge variant={group.autoAssign ? 'default' : 'secondary'}>
                      {group.autoAssign ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={group.status === 'active' ? 'default' : 'secondary'}
                    >
                      {group.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <Link to={`/dashboard/customers/groups/${group.id}`}>
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(group.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
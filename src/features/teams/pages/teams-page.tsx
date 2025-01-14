import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Users2,
  ArrowUpDown,
  MoreHorizontal,
  Mail,
  Clock,
  CheckCircle2,
  XCircle,
  Crown,
} from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { DataTablePagination } from '@/components/ui/data-table/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { InviteModal } from '../components/invite-modal';
import { cn } from '@/lib/utils';

// Mock data for team members
const TEAM_MEMBERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Owner',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&q=90&fit=crop',
    lastActive: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Admin',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&q=90&fit=crop',
    lastActive: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'Staff',
    status: 'pending',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&q=90&fit=crop',
    lastActive: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    role: 'Staff',
    status: 'inactive',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&q=90&fit=crop',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
];

const ROLES = {
  Owner: { color: 'yellow', icon: Crown },
  Admin: { color: 'blue', icon: Users2 },
  Staff: { color: 'gray', icon: Users2 },
} as const;

export function TeamsPage() {
  const [members] = useState(TEAM_MEMBERS);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const {
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    paginateItems,
    pageCount,
  } = usePagination({
    initialPageSize: 10,
  });

  const paginatedMembers = paginateItems(members);

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return `${Math.floor(interval)} year${Math.floor(interval) === 1 ? "" : "s"} ago`;
    
    interval = seconds / 2592000;
    if (interval > 1) return `${Math.floor(interval)} month${Math.floor(interval) === 1 ? "" : "s"} ago`;
    
    interval = seconds / 86400;
    if (interval > 1) return `${Math.floor(interval)} day${Math.floor(interval) === 1 ? "" : "s"} ago`;
    
    interval = seconds / 3600;
    if (interval > 1) return `${Math.floor(interval)} hour${Math.floor(interval) === 1 ? "" : "s"} ago`;
    
    interval = seconds / 60;
    if (interval > 1) return `${Math.floor(interval)} minute${Math.floor(interval) === 1 ? "" : "s"} ago`;
    
    return 'Just now';
  };

  const getRoleBadgeStyles = (role: keyof typeof ROLES) => {
    const colors = {
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      gray: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    
    return colors[ROLES[role].color];
  };

  const getStatusBadgeStyles = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700 border-green-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      inactive: 'bg-red-100 text-red-700 border-red-200',
    };
    return styles[status as keyof typeof styles];
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      active: CheckCircle2,
      pending: Clock,
      inactive: XCircle,
    };
    return icons[status as keyof typeof icons];
  };

  return (
    <div className="space-y-4">
      <motion.div
        className="flex items-center justify-between -mx-6 py-3 px-6 sticky top-0 z-10 pt-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-2xl font-semibold">Team Members</h1>
          <p className="text-sm text-muted-foreground">
            Manage your team members and their roles
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowInviteModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Invite member
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="rounded-lg border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Table className={paginatedMembers.length > 0 ? "rounded-b-none" : ""}>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last active</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedMembers.map((member) => {
              const RoleIcon = ROLES[member.role as keyof typeof ROLES].icon;
              const StatusIcon = getStatusIcon(member.status);

              return (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={cn("gap-1", getRoleBadgeStyles(member.role as keyof typeof ROLES))}
                    >
                      <RoleIcon className="h-3 w-3" />
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={cn("gap-1", getStatusBadgeStyles(member.status))}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {getTimeAgo(member.lastActive)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send reminder
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users2 className="mr-2 h-4 w-4" />
                          Change role
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <XCircle className="mr-2 h-4 w-4" />
                          Remove member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {TEAM_MEMBERS.length > 0 && (
          <motion.div
            className="border-t p-4 bg-main rounded-b-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <DataTablePagination
              pageIndex={pageIndex}
              pageSize={pageSize}
              pageCount={pageCount(members.length)}
              totalItems={members.length}
              onPageChange={setPageIndex}
              onPageSizeChange={setPageSize}
            />
          </motion.div>
        )}
      </motion.div>
      
      <InviteModal 
        open={showInviteModal}
        onOpenChange={setShowInviteModal}
      />
    </div>
  );
}
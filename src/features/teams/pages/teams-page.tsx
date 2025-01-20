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
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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
import { cn, getTimeAgo } from '@/lib/utils';
import { TEAM_MEMBERS } from '../data/members';

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
        className="rounded-lg border bg-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={5} className="p-4 hover:bg-transparent">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50">
                      <Users2 className="h-4 w-4 text-gray-500/80" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium">Free Plan</h3>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {String(5 - members.length)} seat{(5 - members.length === 1 ? "" : "s")} available
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Progress 
                          value={(members.length / 5) * 100} 
                          className="h-1.5 w-[120px]"
                        />
                        <span className="text-xs text-muted-foreground">
                          {String(members.length)}/5 members
                        </span>
                      </div>
                    </div>
                  </div>
                  {members.length >= 4 && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-8 text-xs"
                    >
                      <Sparkles className="mr-2 h-3 w-3" />
                      Upgrade Plan
                    </Button>
                  )}
                </div>
                {members.length >= 5 && (
                  <p className="text-xs text-red-600 mt-3">
                    You've reached your member limit. Upgrade to add more members.
                  </p>
                )}
                {members.length === 4 && (
                  <p className="text-xs text-yellow-600 mt-3">
                    You're approaching your member limit. Consider upgrading your plan.
                  </p>
                )}
              </TableCell>
            </TableRow>
          </TableHeader>
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
                    <Link to={`/dashboard/members/${member.id}`} className="block">
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
                    </Link>
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

        {paginatedMembers.length > 0 && (
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

const ROLES = {
  Owner: { color: 'yellow', icon: Crown },
  Admin: { color: 'blue', icon: Users2 },
  Staff: { color: 'gray', icon: Users2 },
} as const;
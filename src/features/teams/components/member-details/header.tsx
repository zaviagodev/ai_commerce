import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { cn, getTimeAgo } from '@/lib/utils';
import { Member } from '@/types/member';
import { ROLES } from '../../data/roles';

interface HeaderProps {
  member: Member;
  onShowActions: () => void;
}

export function Header({ member, onShowActions }: HeaderProps) {
  const RoleIcon = ROLES[member.role as keyof typeof ROLES].icon;

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

  return (
    <motion.div
      className="flex items-center px-6 -mx-6 py-3 border-b sticky top-0 z-10 pt-14"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="flex flex-col w-full gap-4 sm:flex-row sm:items-center">
        {/* Left Section: Avatar and Title */}
        <div className="flex items-center flex-1 min-w-0">
          <Avatar className="h-16 w-16 shrink-0 rounded-lg border bg-muted overflow-hidden mr-3">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>
              {member.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight truncate">
                {member.name}
              </h1>
              <Badge 
                variant="outline"
                className={cn("gap-1 whitespace-nowrap", getRoleBadgeStyles(member.role as keyof typeof ROLES))}
              >
                <RoleIcon className="h-3 w-3" />
                {member.role}
              </Badge>
              <Badge 
                variant="outline"
                className={cn("gap-1 whitespace-nowrap", getStatusBadgeStyles(member.status))}
              >
                {member.status === 'active' ? (
                  <CheckCircle2 className="h-3 w-3" />
                ) : member.status === 'pending' ? (
                  <Clock className="h-3 w-3" />
                ) : (
                  <XCircle className="h-3 w-3" />
                )}
                {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground overflow-hidden">
              <div className="flex items-center gap-2 shrink-0">
                <div className="relative h-5 w-5 rounded-full overflow-hidden bg-muted">
                  <img
                    src="https://avatars.githubusercontent.com/u/1"
                    alt="Creator"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="hidden sm:inline">Created by</span>
                <span className="truncate">Admin</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span className="truncate">
                Last updated {getTimeAgo(member.updatedAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onShowActions}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </motion.div>
          <div className="mx-2 sm:mx-4 h-4 w-px bg-border" />
          <Button variant="outline">Suspend Account</Button>
          <Button variant="destructive">Remove Member</Button>
        </div>
      </div>
    </motion.div>
  );
}
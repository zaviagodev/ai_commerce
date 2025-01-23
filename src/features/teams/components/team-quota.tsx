import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Users, Crown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface TeamQuotaProps {
  currentUsers: number;
  maxUsers: number;
  plan: 'free' | 'pro' | 'enterprise';
}

export function TeamQuota({ currentUsers, maxUsers, plan }: TeamQuotaProps) {
  const usagePercentage = (currentUsers / maxUsers) * 100;
  const isNearLimit = usagePercentage >= 80;
  const isAtLimit = currentUsers >= maxUsers;

  const getPlanColor = () => {
    switch (plan) {
      case 'enterprise':
        return 'text-purple-500/80 bg-purple-50';
      case 'pro':
        return 'text-blue-500/80 bg-blue-50';
      default:
        return 'text-gray-500/80 bg-gray-50';
    }
  };

  const getPlanIcon = () => {
    switch (plan) {
      case 'enterprise':
        return Crown;
      case 'pro':
        return Sparkles;
      default:
        return Users;
    }
  };

  const PlanIcon = getPlanIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mb-6"
    >
      <Card className="border-dashed">
        <CardContent className="py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${getPlanColor()}`}>
                <PlanIcon className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium capitalize">{plan} Plan</h3>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {maxUsers - currentUsers} seat{maxUsers - currentUsers === 1 ? "" : "s"} available
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <Progress 
                    value={usagePercentage} 
                    className="h-1.5 w-[120px]"
                  />
                  <span className="text-xs text-muted-foreground">
                    {currentUsers}/{maxUsers} members
                  </span>
                </div>
              </div>
            </div>
            {(isNearLimit || isAtLimit) && (
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

          {isNearLimit && !isAtLimit && (
            <p className="text-xs text-yellow-600 mt-3">
              You're approaching your member limit. Consider upgrading your plan.
            </p>
          )}
          {isAtLimit && (
            <p className="text-xs text-red-600 mt-3">
              You've reached your member limit. Upgrade to add more members.
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
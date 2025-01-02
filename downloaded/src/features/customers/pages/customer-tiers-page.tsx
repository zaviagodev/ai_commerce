import { Link } from 'react-router-dom';
import { Plus, Crown } from 'lucide-react';
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
import { useCustomerTiers } from '../hooks/use-customer-tiers';

export function CustomerTiersPage() {
  const { tiers, isLoading } = useCustomerTiers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Customer Tiers</h1>
          <p className="text-sm text-muted-foreground">
            Manage customer loyalty tiers and rewards
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/customers/tiers/new">
            <Plus className="mr-2 h-4 w-4" />
            Add tier
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tier</TableHead>
              <TableHead>Rewards Multiplier</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Benefits</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tiers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-medium">No tiers found</p>
                    <p className="text-sm text-muted-foreground">
                      Get started by creating your first customer tier
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/dashboard/customers/tiers/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add tier
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              tiers.map((tier) => (
                <TableRow key={tier.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${tier.color}-100`}>
                        <Crown className={`h-5 w-5 text-${tier.color}-600`} />
                      </div>
                      <div>
                        <Link
                          to={`/dashboard/customers/tiers/${tier.id}`}
                          className="font-medium hover:underline"
                        >
                          {tier.name}
                        </Link>
                        {tier.description && (
                          <p className="text-sm text-muted-foreground">
                            {tier.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{tier.rewardsMultiplier}x</TableCell>
                  <TableCell>{tier.discountPercentage}%</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {tier.freeShipping && (
                        <Badge variant="secondary">Free Shipping</Badge>
                      )}
                      {tier.prioritySupport && (
                        <Badge variant="secondary">Priority Support</Badge>
                      )}
                      {tier.earlyAccess && (
                        <Badge variant="secondary">Early Access</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={tier.status === 'active' ? 'default' : 'secondary'}
                    >
                      {tier.status}
                    </Badge>
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
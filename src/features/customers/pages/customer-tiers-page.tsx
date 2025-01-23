import { Link, useNavigate } from "react-router-dom";
import { Plus, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useCustomerTiers } from "../hooks/use-customer-tiers";
import Loading from "@/components/loading";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/hooks";
import { ProductSearch } from "@/features/products/components/product-search";
import { useMemo, useState } from "react";

export function CustomerTiersPage() {
  const navigate = useNavigate();
  const { tiers, isLoading } = useCustomerTiers();
  const t = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const filteredTiers = useMemo(() => {
    let filtered = tiers;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = tiers.filter((tier) =>
        tier.name.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [tiers, searchQuery]);

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
          <h1 className="text-2xl font-semibold">
            {t.customers.customer.tier.list.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t.customers.customer.tier.list.description}
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/customer-tiers/new">
            <Plus className="mr-2 h-4 w-4" />
            {t.customers.customer.tier.list.actions.create}
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
          placeholder={t.customers.customer.tier.list.search}
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
              <TableHead>
                {t.customers.customer.tier.list.columns.tier}
              </TableHead>
              <TableHead>
                {t.customers.customer.tier.list.columns.rewardsMultiplier}
              </TableHead>
              <TableHead>
                {t.customers.customer.tier.list.columns.discount}
              </TableHead>
              <TableHead>
                {t.customers.customer.tier.list.columns.benefits}
              </TableHead>
              <TableHead>
                {t.customers.customer.tier.list.columns.status}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTiers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-medium">
                      {t.customers.customer.tier.list.empty.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t.customers.customer.tier.list.empty.description}
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link to="/dashboard/customer-tiers/new">
                        <Plus className="mr-2 h-4 w-4" />
                        {t.customers.customer.tier.list.actions.create}
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredTiers.map((tier) => (
                <TableRow
                  key={tier.id}
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(`/dashboard/customer-tiers/${tier.id}`)
                  }
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${tier.color}-100`}
                      >
                        <Crown className={`h-5 w-5 text-${tier.color}-600`} />
                      </div>
                      <div>
                        <span className="font-medium hover:underline">
                          {tier.name}
                        </span>
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
                        <Badge variant="secondary">
                          {t.customers.customer.tier.list.benefits.freeShipping}
                        </Badge>
                      )}
                      {tier.prioritySupport && (
                        <Badge variant="secondary">
                          {
                            t.customers.customer.tier.list.benefits
                              .prioritySupport
                          }
                        </Badge>
                      )}
                      {tier.earlyAccess && (
                        <Badge variant="secondary">
                          {t.customers.customer.tier.list.benefits.earlyAccess}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn("capitalize shadow-none", {
                        "!bg-green-100 !text-green-700 dark:!bg-green-700 dark:!text-green-100":
                          tier.status === "active",
                        "!bg-red-100 !text-red-700 dark:!bg-red-700 dark:!text-red-100":
                          tier.status === "inactive",
                      })}
                    >
                      {t.customers.customer.tier.list.status[tier.status]}
                    </Badge>
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

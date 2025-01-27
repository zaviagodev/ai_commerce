import { Link, useNavigate } from "react-router-dom";
import { Plus, QrCode, Barcode } from "lucide-react";
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
import { Redeem } from "@/types/redeem";
import { DataTablePagination } from "@/components/ui/data-table/pagination";
import { usePagination } from "@/hooks/use-pagination";
import { cn, formatDate } from "@/lib/utils";
import { RedeemCodeModal } from "./redeem-code-modal";
import { useMemo, useState } from "react";
import Loading from "@/components/loading";
import { ProductSearch } from "@/features/products/components/product-search";
import { useTranslation } from "@/lib/i18n/hooks";

interface RedeemListProps {
  redeems: Redeem[];
  isLoading: boolean;
}

export function RedeemList({ redeems, isLoading }: RedeemListProps) {
  const t = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const {
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    paginateItems,
    pageCount,
  } = usePagination();

  const [searchQuery, setSearchQuery] = useState("");
  const filteredRedeems = useMemo(() => {
    let filtered = redeems;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = redeems.filter(
        (redeem) =>
          redeem.code.toLowerCase().includes(query) ||
          redeem.customerName.toLowerCase().includes(query) ||
          redeem.customerEmail.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [redeems, searchQuery]);

  const paginatedRedeems = paginateItems(filteredRedeems);

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
            {t.redeemList.redeemList.list.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t.redeemList.redeemList.list.description}
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t.redeemList.redeemList.list.actions.newRedeem}
        </Button>
      </motion.div>

      {/* <motion.div
        className="flex items-center justify-end gap-4 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <ProductSearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t.redeemList.redeemList.list.search}
        />
      </motion.div> */}

      <motion.div
        className="rounded-lg border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Table className={paginatedRedeems.length > 0 ? "rounded-b-none" : ""}>
          <TableHeader>
            <TableRow>
              <TableHead>
                {t.redeemList.redeemList.list.table.headers.redeemCode}
              </TableHead>
              <TableHead>
                {t.redeemList.redeemList.list.table.headers.customer}
              </TableHead>
              <TableHead>
                {t.redeemList.redeemList.list.table.headers.pointsRedeemed}
              </TableHead>
              <TableHead>
                {t.redeemList.redeemList.list.table.headers.status}
              </TableHead>
              <TableHead>
                {t.redeemList.redeemList.list.table.headers.dateRedeemed}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRedeems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <div className="py-12">
                    <p className="text-lg font-semibold">
                      {t.redeemList.redeemList.list.table.empty.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t.redeemList.redeemList.list.table.empty.description}
                    </p>
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      className="mt-4"
                      variant="outline"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      {t.redeemList.redeemList.list.actions.newRedeem}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedRedeems.map((redeem) => (
                <TableRow
                  key={redeem.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() =>
                    navigate(`/dashboard/redeem-list/${redeem.id}`)
                  }
                >
                  <TableCell>
                    <div className="font-mono">{redeem.code}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{redeem.customerName}</div>
                    <div className="text-sm text-muted-foreground">
                      {redeem.customerEmail}
                    </div>
                  </TableCell>
                  <TableCell>
                    {redeem.pointsRedeemed.toLocaleString()}{" "}
                    {
                      t.redeemList.redeemList.list.table.cells[
                        redeem.pointsRedeemed === 1 ? "point" : "points"
                      ]
                    }
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn("capitalize shadow-none", {
                        "!bg-green-100 !text-green-700 dark:!bg-green-700 dark:!text-green-100":
                          redeem.status === "completed",
                        "!bg-red-100 !text-red-700 dark:!bg-red-700 dark:!text-red-100":
                          redeem.status === "cancelled",
                        "!bg-yellow-100 !text-yellow-700 dark:!bg-yellow-700 dark:!text-yellow-100":
                          redeem.status === "pending",
                      })}
                    >
                      {
                        t.redeemList.redeemList.list.table.status[
                          redeem.status as keyof typeof t.redeemList.redeemList.list.table.status
                        ]
                      }
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(redeem.redeemedAt)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <motion.div
          className={cn("border-t p-4 bg-main rounded-b-lg", {
            hidden: paginatedRedeems.length === 0,
          })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <DataTablePagination
            pageIndex={pageIndex}
            pageSize={pageSize}
            pageCount={pageCount(redeems.length)}
            totalItems={redeems.length}
            onPageChange={setPageIndex}
            onPageSizeChange={setPageSize}
          />
        </motion.div>
      </motion.div>

      <RedeemCodeModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}

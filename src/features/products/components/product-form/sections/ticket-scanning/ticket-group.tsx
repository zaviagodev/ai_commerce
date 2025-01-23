import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTablePagination } from "@/components/ui/data-table/pagination";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface GroupTicket {
  ticketNumber: string;
  attendeeName: string;
  ticketType: string;
  status: "valid" | "used" | "invalid";
}

interface TicketGroupProps {
  tickets: GroupTicket[];
  selectedTickets: string[];
  onSelectTicket: (ticketNumber: string) => void;
  onSelectAll: () => void;
  onValidateSelected: () => void;
}

export function TicketGroup({
  tickets,
  selectedTickets,
  onSelectTicket,
  onSelectAll,
  onValidateSelected,
}: TicketGroupProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageTickets = tickets.slice(startIndex, endIndex);
  const isAllSelected = selectedTickets.length === tickets.length;

  return (
    <div className="space-y-4">
      {/* Selection Controls */}
      <div className="flex flex-col items-center justify-between gap-4">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={onSelectAll}
              id="select-all"
            />
            <label
              htmlFor="select-all"
              className="text-sm font-medium cursor-pointer select-none"
            >
              Select All Tickets
            </label>
          </div>
          {selectedTickets.length > 0 && (
            <Badge variant="secondary">{selectedTickets.length} selected</Badge>
          )}
        </div>
        {selectedTickets.length > 0 && (
          <Button type="button" size="sm" onClick={onValidateSelected}>
            Validate Selected ({selectedTickets.length})
          </Button>
        )}
      </div>

      {/* Ticket List */}
      <div className="space-y-3">
        {currentPageTickets.map((ticket) => (
          <div
            key={ticket.ticketNumber}
            className={`flex items-center justify-between rounded-lg border bg-main p-3 transition-colors ${
              selectedTickets.includes(ticket.ticketNumber)
                ? "border-primary bg-primary/5"
                : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <Checkbox
                checked={selectedTickets.includes(ticket.ticketNumber)}
                onCheckedChange={() => onSelectTicket(ticket.ticketNumber)}
              />
              <div>
                <p className="font-medium">{ticket.attendeeName}</p>
                <p className="text-sm text-muted-foreground">
                  {ticket.ticketType} • #{ticket.ticketNumber}
                </p>
              </div>
            </div>
            <Badge
              // variant={ticket.status === 'valid' ? 'outline' : 'secondary'}
              className={cn(
                "shadow-none !bg-red-100 !text-red-700 dark:!bg-red-700 dark:!text-red-100",
                {
                  "!bg-green-100 !text-green-700 dark:!bg-green-700 dark:!text-green-100 border-green-300":
                    ticket.status === "valid",
                  "!bg-gray-100 !text-gray-700 dark:!bg-gray-700 dark:!text-gray-100":
                    ticket.status === "used",
                },
              )}
            >
              {ticket.status === "valid"
                ? "Valid"
                : ticket.status === "used"
                  ? "Used"
                  : "Invalid"}
            </Badge>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {tickets.length > pageSize && (
        <div className="border-t pt-4">
          <DataTablePagination
            pageIndex={pageIndex}
            pageSize={pageSize}
            pageCount={Math.ceil(tickets.length / pageSize)}
            totalItems={tickets.length}
            onPageChange={setPageIndex}
            onPageSizeChange={setPageSize}
          />
        </div>
      )}
    </div>
  );
}

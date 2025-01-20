import { Badge } from "@/components/ui/badge";
import { QrCode, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface ScanResultData {
  ticketNumber: string;
  attendeeName: string;
  email: string;
  ticketType: string;
  status: "valid" | "used" | "invalid";
  groupId?: string;
  groupTickets?: {
    ticketNumber: string;
    attendeeName: string;
    ticketType: string;
    code: string;
    status: "valid" | "used" | "invalid";
  }[];
}

interface ScanResultProps {
  result: ScanResultData;
  selectedTickets: string[];
  onSelectTicket: (ticketNumber: string) => void;
  onSelectAll: () => void;
  onMarkAsUsed: () => void;
}

export function ScanResult({
  result,
  selectedTickets,
  onSelectTicket,
  onSelectAll,
  onMarkAsUsed,
}: ScanResultProps) {
  const hasGroupTickets = result.groupTickets && result.groupTickets.length > 1;

  return (
    <div className="space-y-4">
      {/* Customer Info */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
          <QrCode className="h-6 w-6 text-gray-600" />
        </div>
        <div>
          <h3 className="font-medium">{result.attendeeName}</h3>
          <p className="text-sm text-muted-foreground">{result.email}</p>
        </div>
      </div>

      {/* Ticket Details */}
      <div className="p-3 rounded-lg bg-white border border-gray-200 space-y-2">
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className={
              result.status === "valid"
                ? "bg-green-100 text-green-800 border-green-300"
                : "bg-yellow-100 text-yellow-800 border-yellow-300"
            }
          >
            {result.status === "valid" ? "Valid Ticket" : "Used Ticket"}
          </Badge>
          {hasGroupTickets && (
            <Badge
              variant="outline"
              className="bg-blue-100 text-blue-800 border-blue-300"
            >
              Group Purchase
            </Badge>
          )}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            Ticket #{result.ticketNumber}
          </p>
          <p className="text-sm font-medium">{result.ticketType}</p>
        </div>
      </div>

      {/* Group Tickets */}
      {hasGroupTickets && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Group Tickets</h4>
            <Button variant="outline" size="sm" onClick={onSelectAll}>
              {selectedTickets.length === result.groupTickets?.length
                ? "Deselect All"
                : "Select All"}
            </Button>
          </div>

          <div className="space-y-2">
            {result.groupTickets?.map((ticket) => (
              <div
                key={ticket.ticketNumber}
                className="flex items-center justify-between p-2 rounded-lg border bg-white"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedTickets.includes(ticket.ticketNumber)}
                    onCheckedChange={() => onSelectTicket(ticket.ticketNumber)}
                    disabled={ticket.status === "used"}
                  />
                  <div>
                    <p className="font-medium">{ticket.attendeeName}</p>
                    <p className="text-sm text-muted-foreground">
                      {ticket.ticketType}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Ticket #{ticket.code}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={ticket.status === "valid" ? "outline" : "secondary"}
                  className={
                    ticket.status === "valid"
                      ? "bg-green-100 text-green-800 border-green-300"
                      : "bg-yellow-100 text-yellow-800 border-yellow-300"
                  }
                >
                  {ticket.status === "valid" ? "Valid" : "Used"}
                </Badge>
              </div>
            ))}
          </div>

          {selectedTickets.length > 0 && (
            <Button onClick={onMarkAsUsed} className="w-full">
              <Check className="mr-2 h-4 w-4" />
              Mark as Used ({selectedTickets.length})
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Barcode, Keyboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { TicketService } from "@/features/tickets/services/ticket-service";

type InputMethod = "manual" | "qr" | "barcode";

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
    status: "valid" | "used" | "invalid";
  }[];
}

export default function RecordAttendancePage() {
  const [searchParams] = useSearchParams();
  const [inputMethod, setInputMethod] = useState<InputMethod>("manual");
  const [ticketCode, setTicketCode] = useState("");
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResultData | null>(null);

  // Set ticket code from URL query param if available
  useEffect(() => {
    const code = searchParams.get("ticket_code");
    if (code) {
      setTicketCode(code);
      handleSubmit(null, code);
    }
  }, [searchParams]);

  const handleSelectTicket = (ticketNumber: string) => {
    setSelectedTickets((prev) =>
      prev.includes(ticketNumber)
        ? prev.filter((t) => t !== ticketNumber)
        : [...prev, ticketNumber],
    );
  };

  const handleSelectAll = () => {
    if (!scanResult?.groupTickets) return;
    const allTicketNumbers = scanResult.groupTickets.map((t) => t.ticketNumber);
    setSelectedTickets(
      selectedTickets.length === allTicketNumbers.length
        ? []
        : allTicketNumbers,
    );
  };

  const handleMarkAsUsed = async () => {
    if (selectedTickets.length === 0) return;

    try {
      // Update status for each selected ticket
      await Promise.all(
        selectedTickets.map((ticketId) =>
          TicketService.updateTicketStatus(ticketId, "used"),
        ),
      );

      toast.success(
        `${selectedTickets.length} tickets validated successfully!`,
      );
      setScanResult(null);
      setSelectedTickets([]);
      setTicketCode("");
    } catch (error) {
      toast.error("Failed to validate tickets");
      console.error("Error validating tickets:", error);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent | null,
    prefilledCode?: string,
  ) => {
    if (e) e.preventDefault();
    const codeToUse = prefilledCode || ticketCode;
    if (!codeToUse.trim()) return;

    setIsScanning(true);
    try {
      const result = await TicketService.scanTicketByCode(codeToUse);

      // Transform the data to match our UI format
      const transformedResult: ScanResultData = {
        ticketNumber: result.ticket.code,
        attendeeName: result.order.customerName,
        email: result.order.customerEmail,
        ticketType: result.order.items[0]?.variantName || "Unknown",
        status: result.ticket.status === "unused" ? "valid" : "used",
        groupId: result.order.id,
        groupTickets: result.groupTickets?.map((ticket) => ({
          ticketNumber: ticket.id,
          attendeeName: ticket.metadata.attendeeName,
          ticketType:
            result.order.items.find((item) => item.id === ticket.orderItemId)
              ?.variantName || "Unknown",
          status: ticket.status === "unused" ? "valid" : "used",
        })),
      };

      setScanResult(transformedResult);
    } catch (error) {
      toast.error("Invalid ticket code");
      console.error("Error scanning ticket:", error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Record Attendance</h1>
          <p className="text-muted-foreground">
            Scan or enter ticket codes to record event attendance
          </p>
        </div>

        {/* Input Method Selection */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant={inputMethod === "manual" ? "default" : "outline"}
            onClick={() => setInputMethod("manual")}
          >
            <Keyboard className="mr-2 h-4 w-4" />
            Manual
          </Button>
          <Button
            type="button"
            variant={inputMethod === "qr" ? "default" : "outline"}
            onClick={() => setInputMethod("qr")}
          >
            <QrCode className="mr-2 h-4 w-4" />
            QR Code
          </Button>
          <Button
            type="button"
            variant={inputMethod === "barcode" ? "default" : "outline"}
            onClick={() => setInputMethod("barcode")}
          >
            <Barcode className="mr-2 h-4 w-4" />
            Barcode
          </Button>
        </div>

        {/* Manual Input Form */}
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ticketCode">Ticket Code</Label>
            <Input
              id="ticketCode"
              placeholder="Enter ticket code"
              value={ticketCode}
              onChange={(e) => setTicketCode(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isScanning}>
            {isScanning ? "Scanning..." : "Validate"}
          </Button>
        </form>

        {/* Scan Result */}
        <AnimatePresence>
          {scanResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-4"
            >
              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-medium">Ticket Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">
                      Ticket Number:
                    </span>
                    <p>{scanResult.ticketNumber}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Attendee Name:
                    </span>
                    <p>{scanResult.attendeeName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p>{scanResult.email}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Ticket Type:</span>
                    <p>{scanResult.ticketType}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <p
                      className={
                        scanResult.status === "valid"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {scanResult.status.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>

              {scanResult.groupTickets &&
                scanResult.groupTickets.length > 0 && (
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Group Tickets</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSelectAll}
                      >
                        {selectedTickets.length ===
                        scanResult.groupTickets.length
                          ? "Deselect All"
                          : "Select All"}
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {scanResult.groupTickets.map((ticket) => (
                        <div
                          key={ticket.ticketNumber}
                          className="flex items-center justify-between p-2 bg-muted/50 rounded"
                        >
                          <div className="space-y-1">
                            <p className="font-medium">{ticket.attendeeName}</p>
                            <p className="text-sm text-muted-foreground">
                              {ticket.ticketType}
                            </p>
                          </div>
                          <Button
                            variant={
                              selectedTickets.includes(ticket.ticketNumber)
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() =>
                              handleSelectTicket(ticket.ticketNumber)
                            }
                          >
                            {selectedTickets.includes(ticket.ticketNumber)
                              ? "Selected"
                              : "Select"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {selectedTickets.length > 0 && (
                <Button className="w-full" onClick={handleMarkAsUsed}>
                  Mark {selectedTickets.length} Ticket
                  {selectedTickets.length === 1 ? "" : "s"} as Used
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

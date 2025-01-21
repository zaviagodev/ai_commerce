import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Barcode, Keyboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ScanResult } from "./scan-result";
import { TicketGroup } from "./ticket-group";
import {
  TicketService,
  Ticket,
} from "@/features/tickets/services/ticket-service";

interface TicketScanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

export function TicketScanModal({ open, onOpenChange }: TicketScanModalProps) {
  const [inputMethod, setInputMethod] = useState<InputMethod>("manual");
  const [ticketCode, setTicketCode] = useState("");
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResultData | null>(null);

  const handleSelectTicket = (ticketNumber: string) => {
    setSelectedTickets((prev) =>
      prev.includes(ticketNumber)
        ? prev.filter((t) => t !== ticketNumber)
        : [...prev, ticketNumber]
    );
  };

  const handleSelectAll = () => {
    if (!scanResult?.groupTickets) return;
    const allTicketNumbers = scanResult.groupTickets.map((t) => t.ticketNumber);
    setSelectedTickets(
      selectedTickets.length === allTicketNumbers.length ? [] : allTicketNumbers
    );
  };

  const handleMarkAsUsed = async () => {
    if (selectedTickets.length === 0) return;

    try {
      // Update status for each selected ticket
      await Promise.all(
        selectedTickets.map((ticketId) =>
          TicketService.updateTicketStatus(ticketId, "used")
        )
      );

      toast.success(
        `${selectedTickets.length} tickets validated successfully!`
      );
      onOpenChange(false);
      setScanResult(null);
      setSelectedTickets([]);
    } catch (error) {
      toast.error("Failed to validate tickets");
      console.error("Error validating tickets:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketCode.trim()) return;

    setIsScanning(true);
    try {
      const result = await TicketService.scanTicketByCode(ticketCode);

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
          code: ticket.code,
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md !max-h-[90%] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Scan Ticket</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
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
          <form onSubmit={handleSubmit} className="space-y-4">
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
              >
                <ScanResult
                  result={scanResult}
                  onMarkAsUsed={handleMarkAsUsed}
                  selectedTickets={selectedTickets}
                  onSelectTicket={handleSelectTicket}
                  onSelectAll={handleSelectAll}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/*
                    {inputMethod === 'qr' && (
              <div className="space-y-2">
                <Label>QR Code Scanner</Label>
                <AnimatePresence mode="wait">
                  {!isScanning && !scanResult ? (
                    <motion.div
                      key="scanner"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="aspect-square rounded-lg border-2 border-dashed flex items-center justify-center bg-muted cursor-pointer"
                      onClick={simulateScan}
                    >
                      <div className="text-center">
                        <QrCode className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to scan QR code
                        </p>
                      </div>
                    </motion.div>
                  ) : isScanning ? (
                    <motion.div
                      key="scanning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="aspect-square rounded-lg border-2 relative bg-black/90 flex items-center justify-center"
                    >
                      {/* Scanning animation /}
                      <motion.div
                        className="absolute inset-4 border-2 border-primary rounded-lg"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <p className="text-main font-medium">Scanning...</p>
                    </motion.div>
                  ) : scanResult ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border-2 border-green-600/20 bg-gray-50/80 p-6"
                    >
                      <div className="space-y-6">
                        <ScanResult
                          attendeeName={scanResult.attendeeName}
                          phone={scanResult.phone}
                          ticketNumber={scanResult.ticketNumber}
                          ticketType={scanResult.ticketType}
                          status={scanResult.status}
                          isGroupPurchase={!!scanResult.groupTickets}
                        />

                        {/* Group Tickets /}
                        {scanResult.groupTickets && (
                          <TicketGroup
                            tickets={scanResult.groupTickets}
                            selectedTickets={selectedTickets}
                            onSelectTicket={handleSelectTicket}
                            onSelectAll={handleSelectAll}
                            onValidateSelected={handleValidateSelected}
                          />
                        )}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )}

            {inputMethod === 'barcode' && (
              <div className="space-y-2">
                <Label>Barcode Scanner</Label>
                <div className="aspect-video rounded-lg border-2 border-dashed flex items-center justify-center bg-muted">
                  <div className="text-center">
                    <Barcode className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Point camera at barcode
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons /}
          <div className="flex justify-end gap-2 fixed w-[calc(100%_-_24px)] bg-main p-6 !m-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={!scanResult && !ticketNumber}
            >
              Validate Ticket
            </Button>
          </div>
        </form> 
         */}
      </DialogContent>
    </Dialog>
  );
}

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
import { ScanResult } from "@/features/products/components/product-form/sections/ticket-scanning/scan-result";
import { TicketService } from "@/features/tickets/services/ticket-service";
import { TicketGroup } from "@/features/products/components/product-form/sections/ticket-scanning/ticket-group";

interface FormField {
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "email";
}

interface ScanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formFields: FormField[]; // Array of fields to display in the form
  onSubmit: (formData: Record<string, string>) => Promise<any>; // Function to handle form submission
  onResult?: (result: any) => void; // Callback to handle scan results
  title: string;
}

type InputMethod = "manual" | "qr" | "barcode";

export function ScanModal({
  open,
  onOpenChange,
  formFields,
  onSubmit,
  onResult,
  title,
}: ScanModalProps) {
  const [inputMethod, setInputMethod] = useState<InputMethod>("manual");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any | null>(null);

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    try {
      const result = await onSubmit(formData);
      setScanResult(result);
      onResult?.(result);
      toast.success("Scan successful!");
    } catch (error) {
      toast.error("Scan failed. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsScanning(false);
    }
  };

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

  {
    /* TODO: set the function properly */
  }
  const handleValidateSelected = () => {};

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
      onOpenChange(false);
      setScanResult(null);
      setSelectedTickets([]);
    } catch (error) {
      toast.error("Failed to validate tickets");
      console.error("Error validating tickets:", error);
    }
  };

  const simulateScan = () => {
    console.log("Simulate Scan");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md !max-h-[90%] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <section className="overflow-auto max-h-[75vh] pb-20 space-y-4">
          <div className="space-y-6">
            {/* Input Method Selection */}
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={inputMethod === "manual" ? "default" : "outline"}
                onClick={() => setInputMethod("manual")}
                className="flex flex-col items-center gap-2 h-auto py-4"
              >
                <Keyboard className="h-5 w-5" />
                <span className="text-xs">Manual</span>
              </Button>
              <Button
                type="button"
                variant={inputMethod === "qr" ? "default" : "outline"}
                onClick={() => setInputMethod("qr")}
                className="flex flex-col items-center gap-2 h-auto py-4"
              >
                <QrCode className="h-5 w-5" />
                <span className="text-xs">QR Code</span>
              </Button>
              <Button
                type="button"
                variant={inputMethod === "barcode" ? "default" : "outline"}
                onClick={() => setInputMethod("barcode")}
                className="flex flex-col items-center gap-2 h-auto py-4"
              >
                <Barcode className="h-5 w-5" />
                <span className="text-xs">Barcode</span>
              </Button>
            </div>

            {/* Manual Input Form */}
            {inputMethod !== "qr" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {formFields.map((field) => (
                  <div className="space-y-2" key={field.id}>
                    <Label htmlFor={field.id}>{field.label}</Label>
                    <Input
                      id={field.id}
                      placeholder={field.placeholder}
                      type={field.type || "text"}
                      value={formData[field.id] || ""}
                      onChange={(e) =>
                        handleInputChange(field.id, e.target.value)
                      }
                    />
                  </div>
                ))}
                <Button type="submit" className="w-full" disabled={isScanning}>
                  {isScanning ? "Processing..." : "Submit"}
                </Button>
              </form>
            )}

            {/* QR Code Scanner */}
            {inputMethod === "qr" && (
              <div className="space-y-2">
                <Label>QR Code Scanner</Label>
                <div
                  className="aspect-square rounded-lg border-2 border-dashed flex items-center justify-center bg-muted cursor-pointer"
                  onClick={simulateScan}
                >
                  <div className="text-center">
                    <QrCode className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to simulate QR code scan
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Scan Result */}
            <AnimatePresence>
              {scanResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="rounded-lg border-2 border-green-600/20 bg-gray-50/80 p-6"
                >
                  <ScanResult
                    result={scanResult}
                    onMarkAsUsed={handleMarkAsUsed}
                    selectedTickets={selectedTickets}
                    onSelectTicket={handleSelectTicket}
                    onSelectAll={handleSelectAll}
                  />

                  {/* Group Tickets */}
                  {scanResult.groupTickets && (
                    <TicketGroup
                      tickets={scanResult.groupTickets}
                      selectedTickets={selectedTickets}
                      onSelectTicket={handleSelectTicket}
                      onSelectAll={handleSelectAll}
                      onValidateSelected={handleValidateSelected}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 bottom-0 fixed w-full bg-main p-6 !m-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

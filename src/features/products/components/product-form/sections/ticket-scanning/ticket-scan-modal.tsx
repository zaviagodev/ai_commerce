import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, Barcode, Keyboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { ScanResult } from './scan-result';
import { TicketGroup } from './ticket-group';

interface TicketScanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type InputMethod = 'manual' | 'qr' | 'barcode';

interface ScanResult {
  ticketNumber: string;
  attendeeName: string;
  email: string;
  phone: string;
  ticketType: string;
  status: 'valid' | 'used' | 'invalid';
  groupId?: string;
  groupTickets?: {
    ticketNumber: string;
    attendeeName: string;
    ticketType: string;
    status: 'valid' | 'used' | 'invalid';
  }[];
}

export function TicketScanModal({ open, onOpenChange }: TicketScanModalProps) {
  const [inputMethod, setInputMethod] = useState<InputMethod>('manual');
  const [ticketNumber, setTicketNumber] = useState('');
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  const handleSelectTicket = (ticketNumber: string) => {
    setSelectedTickets(prev => 
      prev.includes(ticketNumber)
        ? prev.filter(t => t !== ticketNumber)
        : [...prev, ticketNumber]
    );
  };

  const handleSelectAll = () => {
    if (!scanResult?.groupTickets) return;
    const allTicketNumbers = scanResult.groupTickets.map(t => t.ticketNumber);
    setSelectedTickets(
      selectedTickets.length === allTicketNumbers.length ? [] : allTicketNumbers
    );
  };

  const handleValidateSelected = () => {
    if (selectedTickets.length === 0) return;
    toast.success(`${selectedTickets.length} tickets validated successfully!`);
    onOpenChange(false);
    setScanResult(null);
    setSelectedTickets([]);
  };

  // Simulate QR code scanning
  const simulateScan = () => {
    setIsScanning(true);
    
    // Simulate scanning delay with mock data
    setTimeout(() => {
      setScanResult({
        ticketNumber: 'TKT-12345',
        attendeeName: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        ticketType: 'VIP',
        status: 'valid',
        groupId: 'GRP-789',
        groupTickets: [
          {
            ticketNumber: 'TKT-12345',
            attendeeName: 'John Doe',
            ticketType: 'VIP',
            status: 'valid'
          },
          {
            ticketNumber: 'TKT-12346',
            attendeeName: 'Jane Doe',
            ticketType: 'VIP',
            status: 'valid'
          },
          {
            ticketNumber: 'TKT-12347',
            attendeeName: 'Bob Smith',
            ticketType: 'VIP',
            status: 'valid'
          }
        ]
      });
      setIsScanning(false);
    }, 2000);
  };

  const handleValidateAll = () => {
    if (!scanResult?.groupTickets) return;
    toast.success('All tickets in group validated successfully!');
    onOpenChange(false);
    setScanResult(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Ticket validated successfully!');
    onOpenChange(false);
    setScanResult(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md !max-h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Scan Ticket</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 overflow-auto pb-16 px-[1px]">
          {/* Input Method Selection */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              type="button"
              variant={inputMethod === 'manual' ? 'default' : 'outline'}
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={() => setInputMethod('manual')}
            >
              <Keyboard className="h-5 w-5" />
              <span className="text-xs">Manual</span>
            </Button>
            <Button
              type="button"
              variant={inputMethod === 'qr' ? 'default' : 'outline'}
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={() => setInputMethod('qr')}
            >
              <QrCode className="h-5 w-5" />
              <span className="text-xs">QR Code</span>
            </Button>
            <Button
              type="button"
              variant={inputMethod === 'barcode' ? 'default' : 'outline'}
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={() => setInputMethod('barcode')}
            >
              <Barcode className="h-5 w-5" />
              <span className="text-xs">Barcode</span>
            </Button>
          </div>

          {/* Input Methods */}
          <div className="space-y-4">
            {inputMethod === 'manual' && (
              <div className="space-y-2">
                <Label htmlFor="ticket">Ticket Number</Label>
                <Input
                  id="ticket"
                  placeholder="Enter ticket number"
                  value={ticketNumber}
                  onChange={(e) => setTicketNumber(e.target.value)}
                />
              </div>
            )}

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
                      {/* Scanning animation */}
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

          {/* Action Buttons */}
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
      </DialogContent>
    </Dialog>
  );
}
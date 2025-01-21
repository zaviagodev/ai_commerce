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
import { Badge } from '@/components/ui/badge';
import { QrCode, Barcode, Keyboard, User, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useTranslation } from '@/lib/i18n/hooks';

interface RedeemCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type InputMethod = 'manual' | 'qr' | 'barcode';

interface ScanResult {
  code: string;
  customerName: string;
  pointsToRedeem: number;
}

export function RedeemCodeModal({ open, onOpenChange }: RedeemCodeModalProps) {
  const t = useTranslation();
  const [inputMethod, setInputMethod] = useState<InputMethod>('manual');
  const [code, setCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  // Simulate QR code scanning
  const simulateScan = () => {
    setIsScanning(true);

    // Simulate scanning delay with mock data
    setTimeout(() => {
      setScanResult({
        code: 'QR12345',
        customerName: 'John Doe',
        customerPhone: '+66891234567',
        pointsToRedeem: 500,
        redeemType: 'product',
        redeemItem: {
          name: 'Premium Coffee',
          quantity: 2,
          pointsRequired: 250,
        },
        couponCode: 'COFFEE2024',
        status: 'unused',
      });
      setIsScanning(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t.points.redeems.form.messages.createSuccess);
    onOpenChange(false);
    setScanResult(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md !max-h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t.points.redeems.form.title.create}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                <Label htmlFor="code">{t.points.redeems.list.columns.id}</Label>
                <Input
                  id="code"
                  placeholder={t.points.redeems.list.search}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
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
                          ease: 'easeInOut',
                        }}
                      />
                      <p className="text-main font-medium">Scanning...</p>
                    </motion.div>
                  ) : scanResult ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="aspect-square rounded-lg border-2 border-green-600/20 bg-gray-50/80 p-6 shadow-lg"
                    >
                      <div className="h-full flex flex-col">
                        {/* Customer Info */}
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              {scanResult.customerName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {scanResult.customerPhone}
                            </p>
                          </div>
                        </div>

                        {/* Redeem Details */}
                        <div className="mt-4 space-y-3">
                          <div className="p-3 rounded-lg bg-main border border-gray-200 space-y-2">
                            {/* Product Image */}
                            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                              <div className="h-16 w-16 rounded-lg border border-gray-200 overflow-hidden">
                                <img
                                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93"
                                  alt="Premium Coffee"
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <span className="font-medium block">
                                    {scanResult.redeemItem.name}
                                  </span>
                                  <span className="text-sm text-gray-600">
                                    Quantity: {scanResult.redeemItem.quantity}x
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 rounded-lg bg-main border border-gray-200">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">
                                {t.points.redeems.list.columns.id}
                              </span>
                              <div className="flex items-center gap-2">
                                <code className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
                                  {scanResult.couponCode}
                                </code>
                                <Badge
                                  variant="outline"
                                  className="bg-green-100 text-green-800 border-green-300"
                                >
                                  {scanResult.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Ready to Process Message */}
                        <div className="mt-4">
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-sm text-center text-gray-700 font-medium animate-fade-up"
                          >
                            {t.points.redeems.form.description.create}
                          </motion.p>
                        </div>
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
              disabled={!scanResult && !code}
              className={cn(
                'transition-all duration-200',
                !scanResult && !code && 'opacity-50 cursor-not-allowed'
              )}
            >
              Process Redeem
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

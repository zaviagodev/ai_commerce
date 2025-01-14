import { Badge } from '@/components/ui/badge';
import { QrCode } from 'lucide-react';

interface ScanResultProps {
  attendeeName: string;
  phone: string;
  ticketNumber: string;
  ticketType: string;
  status: 'valid' | 'used' | 'invalid';
  isGroupPurchase?: boolean;
}

export function ScanResult({
  attendeeName,
  phone,
  ticketNumber,
  ticketType,
  status,
  isGroupPurchase,
}: ScanResultProps) {
  return (
    <div className="space-y-4">
      {/* Customer Info */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
          <QrCode className="h-6 w-6 text-gray-600" />
        </div>
        <div>
          <h3 className="font-medium">{attendeeName}</h3>
          <p className="text-sm text-muted-foreground">{phone}</p>
        </div>
      </div>
      
      {/* Ticket Details */}
      <div className="p-3 rounded-lg bg-main border border-gray-200 space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={status === 'valid' ? "bg-green-100 text-green-600 border-green-300" : "bg-red-100 text-red-600 border-red-300"}>
            {status === 'valid' ? 'Valid Ticket' : 'Invalid Ticket'}
          </Badge>
          {isGroupPurchase && (
            <Badge variant="outline" className="bg-blue-100 text-blue-600 border-blue-300">
              Group Purchase
            </Badge>
          )}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Ticket #{ticketNumber}</p>
          <p className="text-sm font-medium">{ticketType}</p>
        </div>
      </div>
    </div>
  );
}
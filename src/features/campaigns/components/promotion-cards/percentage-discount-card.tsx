import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Percent, Calendar, Package, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PercentageDiscountCardProps {
  onEdit: (id: string) => void;
}

export function PercentageDiscountCard({ onEdit }: PercentageDiscountCardProps) {
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div variants={item}>
      <Card className="relative overflow-hidden">
        {/* Background gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" 
          style={{
            maskImage: 'radial-gradient(circle at 70% 30%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(circle at 70% 30%, black, transparent)',
          }}
        />

        {/* Content */}
        <div className="relative p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <Percent className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">20% Off Everything</h3>
                <p className="text-sm text-muted-foreground">Storewide discount</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Active
            </Badge>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Valid until Dec 31, 2024</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span>All products</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Usage</p>
              <p className="text-2xl font-semibold">245</p>
              <p className="text-xs text-muted-foreground">of 500 available</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Saved</p>
              <p className="text-2xl font-semibold">$1,234</p>
              <p className="text-xs text-muted-foreground">by customers</p>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => onEdit('percentage-discount')}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Promotion
          </Button>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full bg-muted">
          <div 
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: '49%' }}
          />
        </div>
      </Card>
    </motion.div>
  );
}
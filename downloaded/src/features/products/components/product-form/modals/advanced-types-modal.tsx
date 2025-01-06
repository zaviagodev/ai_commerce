import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ticket,
  Calendar,
  Repeat,
  Download,
  Package,
  Paintbrush,
} from 'lucide-react';
import { Product } from '@/types/product';
import { ProductTypeConfig } from './product-type-config';

interface AdvancedTypesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}

const PRODUCT_TYPES = [
  {
    id: 'tickets',
    name: 'Event Tickets',
    description: 'Sell tickets for events, workshops, or seminars',
    icon: Ticket,
    color: 'blue',
  },
  {
    id: 'booking',
    name: 'Booking & Appointments',
    description: 'Allow customers to book time slots for services',
    icon: Calendar,
    color: 'purple',
  },
  {
    id: 'subscription',
    name: 'Subscription',
    description: 'Offer recurring billing and subscriptions',
    icon: Repeat,
    color: 'green',
  },
  {
    id: 'digital',
    name: 'Digital Downloads',
    description: 'Sell downloadable digital products',
    icon: Download,
    color: 'orange',
  },
  {
    id: 'bundle',
    name: 'Product Bundle',
    description: 'Create bundles of multiple products',
    icon: Package,
    color: 'pink',
  },
  {
    id: 'customizable',
    name: 'Customizable Product',
    description: 'Allow product customization options',
    icon: Paintbrush,
    color: 'yellow',
  },
] as const;

export function AdvancedTypesModal({ 
  open, 
  onOpenChange,
  product,
}: AdvancedTypesModalProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleTypeToggle = (typeId: string) => {
    setSelectedType(typeId);
    onOpenChange(false);
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
      pink: { bg: 'bg-pink-100', text: 'text-pink-600' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    };
    return colors[color] || { bg: 'bg-gray-100', text: 'text-gray-600' };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Advanced Product Types</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-4">
          {PRODUCT_TYPES.map((type) => {
            const colors = getColorClasses(type.color);
            const isSelected = selectedType === type.id;

            return (
              <Button
                key={type.id}
                variant="ghost"
                className={`w-full justify-start h-auto py-4 mb-2 ${isSelected ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleTypeToggle(type.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg}`}>
                    <type.icon className={`h-5 w-5 ${colors.text}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{type.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {type.description}
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
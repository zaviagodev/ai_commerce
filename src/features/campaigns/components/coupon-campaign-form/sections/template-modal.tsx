import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Gift, 
  Layers,
  UserPlus,
  Users,
  Package,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';

const TEMPLATES = [
  {
    id: 'bogo',
    name: 'Buy One Get One (BOGO)',
    description: 'Buy one item and get another free or at a discount',
    icon: Gift,
    gradient: 'from-blue-500/10 to-purple-500/10',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    defaults: {
      type: 'percentage',
      value: 100,
      minPurchaseAmount: 0,
      description: 'Buy one item and get another free',
    }
  },
  {
    id: 'tiered',
    name: 'Tiered Discount',
    description: 'Offer increasing discounts based on purchase amount',
    icon: Layers,
    gradient: 'from-purple-500/10 to-pink-500/10',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    defaults: {
      type: 'percentage',
      value: 10,
      minPurchaseAmount: 100,
      description: 'Spend more, save more',
    }
  },
  {
    id: 'first_purchase',
    name: 'First-Time Purchase',
    description: 'Special discount for first-time customers',
    icon: UserPlus,
    gradient: 'from-green-500/10 to-emerald-500/10',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    defaults: {
      type: 'percentage',
      value: 15,
      description: 'Welcome discount for new customers',
    }
  },
  {
    id: 'membership',
    name: 'Membership Discount',
    description: 'Exclusive discount for members/tiers/groups',
    icon: Users,
    gradient: 'from-yellow-500/10 to-orange-500/10',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    defaults: {
      type: 'percentage',
      value: 20,
      description: 'Exclusive member discount',
    }
  },
  {
    id: 'bundle',
    name: 'Bundle Discount',
    description: 'Discount when buying multiple items together',
    icon: Package,
    gradient: 'from-red-500/10 to-orange-500/10',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    defaults: {
      type: 'fixed',
      value: 25,
      description: 'Save when buying together',
    }
  },
  {
    id: 'volume',
    name: 'Volume Discount',
    description: 'Discount based on quantity purchased',
    icon: ShoppingBag,
    gradient: 'from-teal-500/10 to-cyan-500/10',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
    defaults: {
      type: 'percentage',
      value: 10,
      description: 'Buy more, save more',
    }
  },
] as const;

interface TemplateModalProps {
  children: React.ReactNode;
  onSelect: (template: typeof TEMPLATES[number]) => void;
}

export function TemplateModal({ children, onSelect }: TemplateModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Choose Template
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {TEMPLATES.map((template) => {
            const Icon = template.icon;
            return (
              <motion.button
                key={template.id}
                type="button"
                className="w-full text-left relative overflow-hidden rounded-lg p-4 transition-all hover:scale-[1.02] active:scale-[0.98] border"
                onClick={() => {
                  onSelect(template);
                  setOpen(false);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background gradient */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${template.gradient}`}
                  style={{
                    maskImage: 'radial-gradient(circle at 70% 30%, black, transparent)',
                    WebkitMaskImage: 'radial-gradient(circle at 70% 30%, black, transparent)',
                  }}
                />

                <div className="relative flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${template.iconBg}`}>
                    <Icon className={`h-6 w-6 ${template.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
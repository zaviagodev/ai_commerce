import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Copy, Link2, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/hooks';
import { Order } from '@/types/order';

interface CheckoutLinkSectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
}

export function CheckoutLinkSection({
  open,
  onOpenChange,
  order,
}: CheckoutLinkSectionProps) {
  const t = useTranslation();
  const [copied, setCopied] = useState(false);

  // Generate checkout link
  const checkoutLink = `${window.location.origin}/store/checkout/${order.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(checkoutLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4 p-4 m-6 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">{t.orders.orders.form.sections.payment.checkout.title}</h3>
          <p className="text-sm text-gray-400">{t.orders.orders.form.sections.payment.checkout.description}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onOpenChange(false)}
          className="text-gray-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-300">{t.orders.orders.form.sections.payment.checkout.title}</label>
        <div className="flex gap-2">
          <Input
            value={checkoutLink}
            readOnly
            className="flex-1 bg-gray-800 border-gray-700 text-white"
          />
          <Button
            type="button"
            variant="outline"
            className="shrink-0 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
        >
          {t.orders.orders.actions.cancel}
        </Button>
        <Button
          onClick={handleCopy}
          className="bg-primary hover:bg-primary/90"
        >
          {copied ? t.orders.orders.form.sections.payment.checkout.copied : t.orders.orders.form.sections.payment.checkout.copy}
        </Button>
      </div>
    </motion.div>
  );
}

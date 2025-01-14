import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Copy, Link2, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface CheckoutLinkSectionProps {
  orderId: string;
  onCancel: () => void;
}

export function CheckoutLinkSection({
  orderId,
  onCancel,
}: CheckoutLinkSectionProps) {
  const [copied, setCopied] = useState(false);

  // Generate checkout link
  const checkoutLink = `${window.location.origin}/store/checkout/${orderId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(checkoutLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4 p-4 m-6 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700"
    >
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Checkout Link</label>
        <div className="flex gap-2">
          <Input
            value={checkoutLink}
            readOnly
            className="flex-1 bg-gray-800 border-gray-700 text-main"
          />
          <Button
            type="button"
            variant="outline"
            className="shrink-0 bg-gray-800 border-gray-700 text-main hover:bg-gray-700"
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
    </motion.div>
  );
}

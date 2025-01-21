import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ShareableLink } from './shareable-link';
import { useTranslation } from '@/lib/i18n/hooks';

interface InviteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteModal({ open, onOpenChange }: InviteModalProps) {
  const t = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle>{t.teams.invite.title}</DialogTitle>
          </DialogHeader>

          <div className="p-6">
            <ShareableLink onOpenChange={onOpenChange} />
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

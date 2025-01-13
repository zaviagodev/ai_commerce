import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ProductSearch({
  value,
  onChange,
  placeholder,
}: ProductSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleOpenSearch = () => {
    setIsOpening(true);
    setIsExpanded(true);
    setTimeout(() => {
      setIsOpening(false);
    }, 200);
  };

  const handleCloseSearch = () => {
    setIsClosing(true);
    setTimeout(() => {
      onChange('');
      setIsExpanded(false);
      setIsClosing(false);
    }, 200);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            style={{ width: 36 }}
            initial={{ width: 36, opacity: 0 }}
            animate={{ width: isClosing ? 36 : 250, opacity: 1 }}
            exit={{ width: 36, opacity: 0 }}
            transition={{ duration:0.2 }}
            className="flex items-center justify-end"
          >
            <Input
              type="text"
              placeholder={placeholder || 'Search products...'}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={cn('pr-7 transition-all duration-200', {
                'placeholder:opacity-0': isOpening || isClosing,
              })}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  handleCloseSearch();
                }
              }}
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              className={cn("absolute right-0 opacity-100 transition duration-200 !bg-transparent", {'opacity-0': isClosing || isOpening})}
              onClick={handleCloseSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: 36 }}
            transition={{ duration: 0.3 }}
          >
            <Button variant="outline" size="icon" onClick={handleOpenSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

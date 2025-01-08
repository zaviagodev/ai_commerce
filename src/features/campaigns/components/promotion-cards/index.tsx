import { motion } from 'framer-motion';
import { PercentageDiscountCard } from './percentage-discount-card';
import { FreeShippingCard } from './free-shipping-card';
import { CashbackPointsCard } from './cashback-points-card';

interface PromotionCardsProps {
  onEdit: (id: string) => void;
}

export function PromotionCards({ onEdit }: PromotionCardsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      <PercentageDiscountCard onEdit={onEdit} />
      <FreeShippingCard onEdit={onEdit} />
      <CashbackPointsCard onEdit={onEdit} />
    </motion.div>
  );
}
import { RedeemList } from '../components/redeem-list';
import { useRedeems } from '../hooks/use-redeems';
import { useTranslation } from '@/lib/i18n/hooks';

export function RedeemListPage() {
  const t = useTranslation();
  const { redeems, isLoading } = useRedeems();

  return (
    <RedeemList 
      redeems={redeems} 
      isLoading={isLoading} 
      title={t.points.redeems.title}
      description={t.points.redeems.description}
    />
  );
}
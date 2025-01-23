import { RedeemList } from "../components/redeem-list";
import { useRedeems } from "../hooks/use-redeems";

export function RedeemListPage() {
  const { redeems, isLoading } = useRedeems();

  return <RedeemList redeems={redeems} isLoading={isLoading} />;
}

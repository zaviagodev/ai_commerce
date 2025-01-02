import { UseFormReturn } from 'react-hook-form';
import { Gift, Star, Award, Coins, Crown } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { TierSelectorModal } from './tier-selector-modal';
import { DEFAULT_TIERS } from '../../../data/tiers';

// Default values for points and rewards
const DEFAULT_VALUES = {
  pointsEnabled: false,
  pointsEarned: 0,
  pointsRequired: 0,
  pointsValue: 0,
};

interface PointsRewardsProps {
  form: UseFormReturn<Product>;
}

export function PointsRewards({ form }: PointsRewardsProps) {
  const pointsEnabled = form.watch('pointsEnabled');
  const customerTiers = form.watch('customerTiers') ?? DEFAULT_TIERS;

  const removeTier = (tierId: string) => {
    form.setValue(
      'customerTiers',
      customerTiers.filter((tier) => tier.id !== tierId)
    );
  };

  return (
    <div className="space-y-8">
      {/* Points & Rewards Master Switch */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
            <Gift className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-medium">Points & Rewards</h2>
            <p className="text-sm text-muted-foreground">
              Configure points and rewards settings for this product
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="pointsEnabled"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Enable Points & Rewards</FormLabel>
                  <FormDescription>
                    Allow customers to earn and redeem points for this product
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {pointsEnabled && (
        <>
          {/* Points Earning Section */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                <Coins className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-medium">Points Earning</h2>
                <p className="text-sm text-muted-foreground">
                  Configure how customers earn points from this product
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="pointsEarned"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Points Earned</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={field.value ?? DEFAULT_VALUES.pointsEarned}
                        onChange={(e) => field.onChange(Number(e.target.value) || DEFAULT_VALUES.pointsEarned)}
                      />
                    </FormControl>
                    <FormDescription>
                      Base number of points customers earn when purchasing this product
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-medium">Customer Tiers</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Configure point multipliers for each customer tier
                    </p>
                  </div>
                  <TierSelectorModal
                    onSelect={(newTierId) => {
                      const newTier = DEFAULT_TIERS.find((t) => t.id === newTierId);
                      if (newTier && !customerTiers.find(t => t.id === newTier.id)) {
                        form.setValue('customerTiers', [...customerTiers, { ...newTier }]);
                      }
                    }}
                  >
                    <Button type="button" variant="outline" size="sm">
                      <Crown className="mr-2 h-4 w-4" />
                      Add Tier
                    </Button>
                  </TierSelectorModal>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center px-4">
                    <p className="text-sm text-muted-foreground">Click to select a tier</p>
                    <p className="text-sm text-muted-foreground">Points Multiplier</p>
                  </div>

                  {customerTiers.map((tier, index) => (
                    <div
                      key={`tier-${tier.id}-${index}`}
                      className="flex items-center gap-4 rounded-lg border p-4 bg-card"
                    >
                      <TierSelectorModal
                        selectedTierId={tier.id}
                        onSelect={(newTierId) => {
                          const newTier = DEFAULT_TIERS.find((t) => t.id === newTierId);
                          if (newTier) {
                            const updatedTiers = [...customerTiers];
                            updatedTiers[index] = { ...newTier };
                            form.setValue('customerTiers', updatedTiers);
                          }
                        }}
                      >
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1 justify-start gap-3 bg-background hover:bg-accent h-auto py-2"
                        >
                          <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${getTierColor(tier.name).bg}`}>
                            <Crown className={`h-4 w-4 ${getTierColor(tier.name).text}`} />
                          </div>
                          <span>{tier.name}</span>
                        </Button>
                      </TierSelectorModal>

                      <FormField
                        control={form.control}
                        name={`customerTiers.${index}.multiplier`}
                        render={({ field }) => (
                          <FormItem className="w-[180px]">
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                step="0.1"
                                className="bg-background"
                                value={field.value ?? 1}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value) || 1)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTier(tier.id)}
                        className="shrink-0"
                        disabled={customerTiers.length <= 1}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  {customerTiers.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground">
                      <p className="mb-2">No customer tiers added yet</p>
                      <TierSelectorModal
                        onSelect={(newTierId) => {
                          const newTier = DEFAULT_TIERS.find((t) => t.id === newTierId);
                          if (newTier) {
                            form.setValue('customerTiers', [{ ...newTier }]);
                          }
                        }}
                      >
                        <Button type="button" variant="outline" className="mt-2">
                          <Crown className="mr-2 h-4 w-4" />
                          Add Customer Tier
                        </Button>
                      </TierSelectorModal>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Points Redemption Section */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-medium">Points Redemption</h2>
                <p className="text-sm text-muted-foreground">
                  Configure how customers can redeem points for this product
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="pointsRequired"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Points Required for Redemption</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={field.value ?? DEFAULT_VALUES.pointsRequired}
                        onChange={(e) => field.onChange(Number(e.target.value) || DEFAULT_VALUES.pointsRequired)}
                      />
                    </FormControl>
                    <FormDescription>
                      Number of points required to redeem this product
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pointsValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Points Value ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={field.value ?? DEFAULT_VALUES.pointsValue}
                        onChange={(e) => field.onChange(Number(e.target.value) || DEFAULT_VALUES.pointsValue)}
                      />
                    </FormControl>
                    <FormDescription>
                      Monetary value of points when redeemed for this product
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function getTierColor(tierName: string) {
  const colors: Record<string, { bg: string; text: string }> = {
    Bronze: { bg: 'bg-orange-100', text: 'text-orange-600' },
    Silver: { bg: 'bg-gray-100', text: 'text-gray-600' },
    Gold: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    Platinum: { bg: 'bg-blue-100', text: 'text-blue-600' },
  };
  return colors[tierName] || { bg: 'bg-gray-100', text: 'text-gray-600' };
}
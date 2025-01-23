import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown, Plus, Award, Shield, Medal, Trophy } from "lucide-react";
import { DEFAULT_TIERS } from "../../../data/tiers";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "@/lib/i18n/hooks";

interface TierSelectorModalProps {
  children: React.ReactNode;
  selectedTierId?: string;
  onSelect: (tierId: string) => void;
}

export function TierSelectorModal({
  children,
  selectedTierId,
  onSelect,
}: TierSelectorModalProps) {
  const t = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px] p-0 gap-0"
        aria-labelledby="tier-selector-title"
      >
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle id="tier-selector-title">
            {t.products.products.form.sections.organization.tiers.selectTier}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="flex flex-col gap-4 p-6">
            {DEFAULT_TIERS.map((tier) => (
              <div key={tier.id} className="relative">
                <Button
                  type="button"
                  variant="outline"
                  className={`
                  w-full h-auto p-0 overflow-hidden hover:border-black/50 transition-all duration-200
                  ${selectedTierId === tier.id ? "ring-4 ring-black/60" : ""}
                `}
                  onClick={() => {
                    onSelect(tier.id);
                    setOpen(false);
                  }}
                >
                  <div
                    className={`
                  relative w-full h-24 px-6 py-5
                  bg-gradient-to-br ${getTierGradient(tier.name)}
                `}
                  >
                    {/* Card Content */}
                    <div className="relative z-10 h-full flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black/10">
                          {getTierIcon(tier.name)}
                        </div>
                        <div>
                          <h3 className="font-medium text-xl text-main tracking-tight text-left">
                            {tier.name}
                          </h3>
                          <p className="text-sm text-main/80 font-light">
                            {
                              t.products.products.form.sections.organization
                                .tiers.membership
                            }
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-medium text-main tracking-tight">
                          0
                        </p>
                        <p className="text-sm text-main/80 font-light">
                          {
                            t.products.products.form.sections.organization.tiers
                              .activeMembers
                          }
                        </p>
                      </div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/[0.15] to-transparent" />
                  </div>
                </Button>
                {selectedTierId === tier.id && (
                  <div className="absolute inset-0 ring-6 ring-black/60 rounded-lg pointer-events-none" />
                )}
              </div>
            ))}

            {/* Add New Tier Button */}
            <Button
              variant="outline"
              className="w-full h-24 border-dashed"
              onClick={() => {
                // Handle adding new tier
              }}
            >
              <Plus className="mr-2 h-5 w-5" />
              {t.products.products.form.sections.organization.tiers.addNew}
            </Button>
          </div>
        </ScrollArea>
        <div className="flex justify-end px-6 py-4 border-t bg-gray-50/50">
          <Button
            variant="outline"
            className="w-32"
            onClick={() => setOpen(false)}
          >
            {t.products.products.form.sections.organization.tiers.cancel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getTierGradient(tierName: string) {
  const gradients: Record<string, string> = {
    Bronze: "from-[#C87941] to-[#895A34]",
    Silver: "from-[#A7A7A7] to-[#666666]",
    Gold: "from-[#FFB938] to-[#CC8B17]",
    Platinum: "from-[#4F46E5] to-[#2F27B3]",
  };
  return gradients[tierName] || "from-[#64748B] to-[#475569]";
}

function getTierIcon(tierName: string) {
  const icons: Record<string, React.ReactNode> = {
    Bronze: <Medal className="h-6 w-6 text-main" />,
    Silver: <Shield className="h-6 w-6 text-main" />,
    Gold: <Trophy className="h-6 w-6 text-main" />,
    Platinum: <Crown className="h-6 w-6 text-main" />,
  };
  return icons[tierName] || <Award className="h-6 w-6 text-main" />;
}

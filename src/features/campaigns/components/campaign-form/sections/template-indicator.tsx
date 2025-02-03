import { UseFormReturn } from "react-hook-form";
import { Link2, QrCode, Star, Gift, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Campaign } from "@/types/campaign";
import { useTranslation } from "@/lib/i18n/hooks";

interface TemplateIndicatorProps {
  type: "points_multiplier" | "bonus_points";
  qrEnabled?: boolean;
  clickLinkEnabled?: boolean;
  targetType?: string;
}

const TEMPLATE_INFO = {
  // share_link: {
  //   name: "Share Link to Get Points",
  //   description: "Reward customers for sharing and clicking links",
  //   icon: Link2,
  //   gradient: "from-green-500 to-teal-600",
  // },
  scan_points: {
    name: "Scan to Get Points",
    description: "Reward customers for scanning QR codes",
    icon: QrCode,
    gradient: "from-blue-500 to-indigo-600",
  },
  // double_points: {
  //   name: "Double Points Days",
  //   description: "Double points on all purchases",
  //   icon: Star,
  //   gradient: "from-purple-500 to-pink-600",
  // },
  bonus_points: {
    name: "Bonus Points",
    description: "Award bonus points for specific actions",
    icon: Gift,
    gradient: "from-orange-500 to-red-600",
  },
  // tier_multiplier: {
  //   name: "Tier Points Boost",
  //   description: "Increased points for specific customer tiers",
  //   icon: Crown,
  //   gradient: "from-yellow-500 to-orange-600",
  // },
} as const;

export function TemplateIndicator({
  type,
  qrEnabled,
  clickLinkEnabled,
  targetType,
}: TemplateIndicatorProps) {
  const t = useTranslation();

  // Determine which template is being used
  const templateKey = qrEnabled
    ? "scan_points"
    // : clickLinkEnabled
    //   ? "share_link"
      // : type === "points_multiplier" && targetType === "tier"
      //   ? "tier_multiplier"
        // : type === "points_multiplier"
        //   ? "double_points"
          : "bonus_points";

  const template = TEMPLATE_INFO[templateKey];
  const Icon = template.icon;

  return (
    <div
      className={cn(
        "relative rounded-xl p-6 text-main overflow-hidden",
        "bg-gradient-to-br shadow-md",
        template.gradient,
      )}
    >
      {/* Label */}
      <div className="absolute right-4 top-4">
        <div className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
          {t.campaigns.campaign.sections.basicDetails.template.indicator.label}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-main/20">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">
            {t.campaigns.campaign.sections.basicDetails.template.types[
              templateKey
            ]?.title || template.name}
          </h3>
          <p className="text-sm text-main/90 mb-3">
            {t.campaigns.campaign.sections.basicDetails.template.types[
              templateKey
            ]?.description || template.description}
          </p>
          <div className="text-sm text-main/80">
            <p>
              {
                t.campaigns.campaign.sections.basicDetails.template.indicator
                  .features.title
              }
            </p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              {qrEnabled ? (
                <>
                  <li>
                    {
                      t.campaigns.campaign.sections.basicDetails.template
                        .indicator.features.qr.scanning
                    }
                  </li>
                  <li>
                    {
                      t.campaigns.campaign.sections.basicDetails.template
                        .indicator.features.qr.points
                    }
                  </li>
                  <li>
                    {
                      t.campaigns.campaign.sections.basicDetails.template
                        .indicator.features.qr.limits
                    }
                  </li>
                </>
              ) : type === "points_multiplier" ? (
                <>
                  <li>
                    {
                      t.campaigns.campaign.sections.basicDetails.template
                        .indicator.features.multiplier.points
                    }
                  </li>
                  <li>
                    {
                      t.campaigns.campaign.sections.basicDetails.template
                        .indicator.features.multiplier.stackable
                    }
                  </li>
                  <li>
                    {
                      t.campaigns.campaign.sections.basicDetails.template
                        .indicator.features.multiplier.timing
                    }
                  </li>
                </>
              ) : (
                <>
                  <li>
                    {
                      t.campaigns.campaign.sections.basicDetails.template
                        .indicator.features.bonus.points
                    }
                  </li>
                  <li>
                    {
                      t.campaigns.campaign.sections.basicDetails.template
                        .indicator.features.bonus.triggers
                    }
                  </li>
                  <li>
                    {
                      t.campaigns.campaign.sections.basicDetails.template
                        .indicator.features.bonus.targeting
                    }
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.15] to-transparent" />
      <div className="absolute -bottom-8 -right-8 h-32 w-32 bg-main/10 rounded-full blur-2xl" />
    </div>
  );
}

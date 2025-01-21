import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Campaign } from '@/types/campaign';
import { Sparkles, QrCode, Star, Gift, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n/hooks';

interface CampaignTemplate {
  id: string;
  name: string;
  description: string;
  type: 'points_multiplier' | 'bonus_points';
  icon: React.ReactNode;
  gradient: string;
  defaults: Partial<Campaign>;
}

const CAMPAIGN_TEMPLATES: CampaignTemplate[] = [
  {
    id: 'scan_points',
    name: 'Scan to Get Points',
    description: 'Reward customers for scanning QR codes',
    type: 'bonus_points',
    icon: <QrCode className="h-6 w-6 text-main" />,
    gradient: 'from-blue-500 to-indigo-600',
    defaults: {
      type: 'bonus_points',
      bonusPoints: 100,
      qrEnabled: true,
      qrPointType: 'fixed',
      qrPointValue: 100,
      qrScanLimit: 1,
      qrTotalScans: 1000,
    },
  },
  {
    id: 'double_points',
    name: 'Double Points Days',
    description: 'Double points on all purchases',
    type: 'points_multiplier',
    icon: <Star className="h-6 w-6 text-main" />,
    gradient: 'from-purple-500 to-pink-600',
    defaults: {
      type: 'points_multiplier',
      multiplier: 2,
      targetType: 'all',
    },
  },
  {
    id: 'bonus_points',
    name: 'Bonus Points',
    description: 'Award bonus points for specific actions',
    type: 'bonus_points',
    icon: <Gift className="h-6 w-6 text-main" />,
    gradient: 'from-orange-500 to-red-600',
    defaults: {
      type: 'bonus_points',
      bonusPoints: 500,
      targetType: 'all',
    },
  },
  {
    id: 'tier_multiplier',
    name: 'Tier Points Boost',
    description: 'Increased points for specific customer tiers',
    type: 'points_multiplier',
    icon: <Crown className="h-6 w-6 text-main" />,
    gradient: 'from-yellow-500 to-orange-600',
    defaults: {
      type: 'points_multiplier',
      multiplier: 1.5,
      targetType: 'tier',
    },
  },
];

interface TemplateSelectorProps {
  form: UseFormReturn<Campaign>;
}

export function TemplateSelector({ form }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const t = useTranslation();

  const handleTemplateSelect = (template: CampaignTemplate) => {
    setSelectedTemplate(template.id);
    
    // Reset form with template defaults
    form.reset({
      ...form.getValues(), // Keep existing values
      ...template.defaults, // Apply template defaults
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-medium">{ t.campaigns.campaign.sections.basicDetails.template.title}</h2>
          <p className="text-sm text-muted-foreground">
            { t.campaigns.campaign.sections.basicDetails.template.description}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {CAMPAIGN_TEMPLATES.map((template) => (
            <button
              key={template.id}
              type="button"
              className={cn(
                "relative h-[180px] rounded-xl p-6 text-left transition-all",
                "hover:scale-[1.02] active:scale-[0.98]",
                "bg-gradient-to-br shadow-lg",
                template.gradient,
                selectedTemplate === template.id && "ring-2 ring-primary"
              )}
              onClick={() => handleTemplateSelect(template)}
            >
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-4">
                  {template.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  { t.campaigns.campaign.sections.basicDetails.template.types[template.id]?.title || template.name}
                </h3>
                <p className="text-sm text-white/80">
                  { t.campaigns.campaign.sections.basicDetails.template.types[template.id]?.description || template.description}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.15] to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent rounded-b-xl" />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
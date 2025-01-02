import React from 'react';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Link2, Sparkles, QrCode, Star, Gift, Crown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Campaign } from '@/types/campaign';
import { cn } from '@/lib/utils';

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
    id: 'share_link',
    name: 'Share Link to Get Points',
    description: 'Reward customers for sharing and clicking links',
    type: 'bonus_points',
    icon: <Link2 className="h-6 w-6 text-white" />,
    gradient: 'from-green-500 to-teal-600',
    defaults: {
      type: 'bonus_points',
      bonusPoints: 100,
      clickLinkEnabled: true,
      clickLinkLimit: 1,
      targetType: 'all',
      hasConditions: true,
    },
  },
  {
    id: 'scan_points',
    name: 'Scan to Get Points',
    description: 'Reward customers for scanning QR codes',
    type: 'bonus_points',
    icon: <QrCode className="h-6 w-6 text-white" />,
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
    icon: <Star className="h-6 w-6 text-white" />,
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
    icon: <Gift className="h-6 w-6 text-white" />,
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
    icon: <Crown className="h-6 w-6 text-white" />,
    gradient: 'from-yellow-500 to-orange-600',
    defaults: {
      type: 'points_multiplier',
      multiplier: 1.5,
      targetType: 'tier',
    },
  },
];

interface TemplateModalProps {
  form: UseFormReturn<Campaign>;
}

export function TemplateModal({ form }: TemplateModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleTemplateSelect = (template: CampaignTemplate) => {
    setSelectedTemplate(template.id);
    
    const currentValues = form.getValues();

    // Create base reset values
    const baseValues = {
      name: currentValues.name,
      description: currentValues.description,
      startDate: currentValues.startDate,
      endDate: currentValues.endDate,
      status: currentValues.status,
      // Reset all feature flags
      qrEnabled: false,
      clickLinkEnabled: false,
      hasConditions: false
    };

    // Reset form with combined values
    form.reset({
      ...baseValues,
      ...template.defaults
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline" 
          size="sm"
          type="button"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Change Template
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Choose Campaign Template</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Select a campaign template to customize your rewards program
          </p>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          {CAMPAIGN_TEMPLATES.map((template) => (
            <button
              key={template.id}
              type="button"
              className={cn(
                "relative w-[80%] mx-auto rounded-lg p-4 text-left transition-all",
                "hover:scale-[1.02] hover:shadow-md active:scale-[0.98]",
                "bg-[#F9F9F9] border border-[#E0E0E0]",
                "flex items-center gap-4",
                selectedTemplate === template.id && "ring-2 ring-primary",
                "group"
              )}
              onClick={() => handleTemplateSelect(template)}
            >
              {/* Content */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#3A3A3A]">{template.icon}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-[#3A3A3A] mb-1">
                  {template.name}
                </h3>
                <p className="text-sm text-[#6D6D6D]">
                  {template.description}
                </p>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 shadow-[0px_2px_4px_rgba(0,0,0,0.1)] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
        <div className="h-px w-full bg-[#E0E0E0] my-4" />
      </DialogContent>
    </Dialog>
  );
}
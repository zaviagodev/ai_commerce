import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Campaign } from '@/types/campaign';
import { CampaignSchema } from '../../schemas/campaign-schema';
import { TemplateSelector } from './sections/template-selector';
import { ProductRules } from './sections/product-rules';
import { BasicDetails } from './sections/basic-details';
import { Conditions } from './sections/conditions';
import { EarningRules } from './sections/earning-rules';
import { PointsConfig } from './sections/points-config';
import { QrCodeConfig } from './sections/qr-code-config';
import { ClickLinkConfig } from './sections/click-link-config';
import { DisplaySettings } from './sections/display-settings';
import { Limitations } from './sections/limitations';
import { Gift } from 'lucide-react';

interface CampaignFormProps {
  initialData?: Campaign;
  onSubmit: (data: Campaign) => Promise<void>;
}

export function CampaignForm({ initialData, onSubmit }: CampaignFormProps) {
  console.log("initialData", initialData);
  const form = useForm({
    resolver: zodResolver(CampaignSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'points_multiplier',
      multiplier: 1,
      hasProductRules: false,
      productRules: [],
      conditions: [],
      bonusPoints: null,
      targetType: 'all',
      status: 'draft',
      hasConditions: false,
      qrEnabled: false,
      qrPointType: 'fixed',
      qrPointValue: 1,
      qrScanLimit: 1,
      qrTotalScans: 100,
      clickLinkEnabled: false,
      clickLinkUrl: '',
      clickLinkLimit: 1,
      startDate: new Date(new Date().setMinutes(0, 0, 0)), // Start of current hour
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 days from now
      ...initialData,
    },
  });


  const handleSubmit = async (data: Campaign) => {
    try {
      console.log("form submitted =>", form.getValues());
      await onSubmit(form.getValues());
    } catch (error) {
      console.error('Failed to save campaign:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="flex items-center justify-between -mx-6 py-3 px-6 sticky top-0 z-10 pt-14">
            <div>
              <h1 className="text-2xl font-semibold">
                {initialData ? 'Edit campaign' : 'Create campaign'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {initialData
                  ? 'Update campaign details'
                  : 'Create a new points and rewards campaign'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button type="button" variant="outline">
                Discard
              </Button>
              <Button type="submit">Save campaign</Button>
            </div>
          </div>

          <div className="grid gap-6 mx-auto max-w-4xl pr-6">
            {/* Basic Details */}
            <div className="rounded-lg border bg-white">
              <div className="flex items-center gap-4 p-6 border-b">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Gift className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">Basic Details</h2>
                  <p className="text-sm text-muted-foreground">
                    Configure the campaign's basic information
                  </p>
                </div>
              </div>
              <div className="p-6">
                <BasicDetails form={form} />
              </div>
            </div>

            {/* Show relevant sections based on template type */}
            {form.watch('type') === 'points_multiplier' ? (
              <>
                <PointsConfig form={form} />
                <ProductRules form={form} />
                <Conditions form={form} />
              </>
            ) : form.watch('qrEnabled') ? (
              <>
                <QrCodeConfig form={form} />
                <ProductRules form={form} />
                <Conditions form={form} />
              </>
            ) : form.watch('clickLinkEnabled') ? (
              <>
                <ClickLinkConfig form={form} />
                <ProductRules form={form} />
                <Conditions form={form} />
              </>
            ) : (
              <>
                <PointsConfig form={form} />
                <ProductRules form={form} />
                <Conditions form={form} />
              </>
            )}

            {/* Display Settings Section */}
            <DisplaySettings form={form} />

            {/* Limitations Section */}
            <Limitations form={form} />
          </div>
        </form>
      </Form>
    </div>
  );
}

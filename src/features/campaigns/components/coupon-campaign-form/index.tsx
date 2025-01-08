import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CouponSchema } from '../../schemas/coupon-schema';
import { Coupon } from '@/types/coupon';
import { BasicDetails } from './sections/basic-details';
import { DiscountRules } from './sections/discount-rules';
import { UsageLimits } from './sections/usage-limits';
import { AdvancedConditions } from './sections/advanced-conditions';
import { CouponPreview } from './sections/coupon-preview';
import { Tags, Share2 } from 'lucide-react';
import { ShareModal } from '@/components/share/share-modal';
import { useState, useRef, useEffect } from 'react';

interface CouponCampaignFormProps {
  initialData?: Partial<Coupon>;
  onSubmit: (data: Coupon) => Promise<void>;
}

export function CouponCampaignForm({
  initialData,
  onSubmit,
}: CouponCampaignFormProps) {
  const form = useForm({
    resolver: zodResolver(CouponSchema),
    defaultValues: {
      code: '',
      description: '',
      type: 'percentage',
      value: 0,
      minPurchaseAmount: undefined,
      maxDiscountAmount: undefined,
      usageLimit: undefined,
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      status: 'draft',
      advancedMode: false,
      conditions: [],
      ...initialData,
    },
  });

  const handleSubmit = async (data: Coupon) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Failed to save coupon:', error);
    }
  };

  const couponCode = form.watch('code');
  const [isEditing, setIsEditing] = useState(false);
  const [editedCode, setEditedCode] = useState(couponCode);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEditing = () => {
    setIsEditing(true);
    setEditedCode(couponCode);
  };

  const handleCodeSubmit = () => {
    if (editedCode.trim()) {
      form.setValue('code', editedCode.trim().toUpperCase());
    }
    setIsEditing(false);
  };

  return (
    <div className="flex h-screen flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col h-full"
        >
          {/* Header */}
          <div className="flex items-center px-6 -mx-6 py-3 border-b sticky top-0 z-10 pt-14">
            <div className="flex flex-col w-full gap-4 sm:flex-row sm:items-center">
              {/* Left Section */}
              <div className="flex items-center flex-1 min-w-0">
                <div className="relative h-16 w-16 shrink-0 rounded-lg border bg-muted overflow-hidden mr-3">
                  <div className="flex h-full w-full items-center justify-center">
                    <Tags className="h-6 w-6 text-muted-foreground" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {isEditing ? (
                      <input
                        ref={inputRef}
                        type="text"
                        value={editedCode}
                        onChange={(e) => setEditedCode(e.target.value)}
                        onBlur={handleCodeSubmit}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleCodeSubmit();
                          } else if (e.key === 'Escape') {
                            setIsEditing(false);
                            setEditedCode(couponCode);
                          }
                        }}
                        className="text-xl sm:text-2xl font-semibold tracking-tight bg-transparent border-none outline-none focus:ring-0 p-0 w-full uppercase"
                      />
                    ) : (
                      <h1
                        className="text-xl sm:text-2xl font-semibold tracking-tight cursor-text"
                        onClick={handleStartEditing}
                      >
                        {couponCode || 'UNTITLED-COUPON'}
                      </h1>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Create a new coupon campaign
                  </p>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-2">
                <ShareModal
                  title={couponCode || 'New Coupon'}
                  url={window.location.href}
                >
                  <Button
                    type="button"
                    variant="outline"
                    className="hidden sm:flex"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </ShareModal>
                <div className="mx-2 h-4 w-px bg-border" />
                <Button type="submit">Save campaign</Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto move-top">
            <div className="h-full">
              <div className="max-w-4xl mx-auto pl-0 pr-6 py-8 relative">
                <Tabs
                  defaultValue={initialData ? 'overview' : 'details'}
                  className="w-full"
                >
                  <TabsList className="mb-6">
                    {initialData && (
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                    )}
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>
                  {initialData && (
                    <TabsContent value="overview" className="space-y-8">
                      <CouponPreview form={form} />
                    </TabsContent>
                  )}
                  <TabsContent value="details" className="space-y-8">
                    <BasicDetails form={form} />
                    <DiscountRules form={form} />
                    <UsageLimits form={form} />
                    <AdvancedConditions form={form} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

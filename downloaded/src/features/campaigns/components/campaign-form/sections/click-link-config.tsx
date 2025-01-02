import { UseFormReturn } from 'react-hook-form';
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
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Campaign } from '@/types/campaign';
import { Link2, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface ClickLinkConfigProps {
  form: UseFormReturn<Campaign>;
}

export function ClickLinkConfig({ form }: ClickLinkConfigProps) {
  const clickLinkEnabled = form.watch('clickLinkEnabled');
  const campaignId = form.watch('id');
  const baseUrl = window.location.origin;
  
  // Auto-generate campaign link
  const campaignLink = campaignId 
    ? `${baseUrl}/points/redeem/${campaignId}`
    : 'Link will be generated when campaign is saved';

  const handleCopyLink = async () => {
    if (!campaignId) return;
    try {
      await navigator.clipboard.writeText(campaignLink);
      toast.success('Link copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
          <Link2 className="h-5 w-5 text-orange-600" />
        </div>
        <div>
          <h2 className="text-lg font-medium">Click Link Configuration</h2>
          <p className="text-sm text-muted-foreground">
            Configure link-based point earning
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="clickLinkEnabled"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Enable Click Link</FormLabel>
                <FormDescription>
                  Allow customers to earn points by visiting a link
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

        {clickLinkEnabled && (
          <>
            <FormField
              control={form.control}
              name="clickLinkPreview"
              render={() => (
                <FormItem>
                  <FormLabel>Campaign Redemption Link</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input 
                        value={campaignLink}
                        readOnly
                        className="bg-muted"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleCopyLink}
                      disabled={!campaignId}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormDescription>
                    This link will be automatically generated when the campaign is saved
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clickLinkLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Click Limit per Customer</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Maximum number of times a customer can earn points from this link
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Link Preview */}
            <div className="rounded-lg border p-4 bg-muted/50">
              <div className="flex items-center gap-3 mb-2">
                <Link2 className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-sm font-medium">Link Preview</h3>
              </div>
              <div className="text-sm text-muted-foreground">
                {campaignId ? (
                  <div className="flex items-center gap-2">
                    <span className="truncate">{campaignLink}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyLink}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <span>Link will be generated when campaign is saved</span>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TextShimmer } from '@/components/ui/text-shimmer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Copy, RefreshCw, Loader2, Share2, Link2, Clock, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { addDays, format } from 'date-fns';
import { useTranslation } from '@/lib/i18n/hooks';

interface ShareableLinkProps {
  onOpenChange: (open: boolean) => void;
}

export function ShareableLink({ onOpenChange }: ShareableLinkProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [role, setRole] = useState('viewer');
  const [expiration, setExpiration] = useState('7d');
  const [uses, setUses] = useState('unlimited');
  const [generatedAt, setGeneratedAt] = useState<Date | null>(null);
  const [isCopying, setIsCopying] = useState(false);
  const t = useTranslation();

  const getExpirationDate = () => {
    if (!generatedAt) return null;
    switch (expiration) {
      case '24h':
        return addDays(generatedAt, 1);
      case '7d':
        return addDays(generatedAt, 7);
      case '30d':
        return addDays(generatedAt, 30);
      default:
        return null;
    }
  };

  const generateLink = async () => {
    setIsGenerating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newLink = `https://app.example.com/invite/${Math.random().toString(36).substring(7)}`;
      setInviteLink(newLink);
      setGeneratedAt(new Date());
      toast.success(t.teams.invite.link.generated);
    } catch (error) {
      toast.error(t.teams.invite.link.error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyLink = async () => {
    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(inviteLink);
      toast.success(t.teams.invite.link.copied);
    } catch (error) {
      toast.error(t.teams.invite.link.copyError);
    } finally {
      setTimeout(() => setIsCopying(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Settings */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">{t.teams.invite.settings.role.label}</p>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">{t.teams.invite.settings.role.options.admin}</SelectItem>
              <SelectItem value="editor">{t.teams.invite.settings.role.options.editor}</SelectItem>
              <SelectItem value="viewer">{t.teams.invite.settings.role.options.viewer}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">{t.teams.invite.settings.expiration.label}</p>
          <Select value={expiration} onValueChange={setExpiration}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">{t.teams.invite.settings.expiration.options.hours24}</SelectItem>
              <SelectItem value="7d">{t.teams.invite.settings.expiration.options.days7}</SelectItem>
              <SelectItem value="30d">{t.teams.invite.settings.expiration.options.days30}</SelectItem>
              <SelectItem value="never">{t.teams.invite.settings.expiration.options.never}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">{t.teams.invite.settings.maxUses.label}</p>
          <Select value={uses} onValueChange={setUses}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">{t.teams.invite.settings.maxUses.options.one}</SelectItem>
              <SelectItem value="5">{t.teams.invite.settings.maxUses.options.five}</SelectItem>
              <SelectItem value="10">{t.teams.invite.settings.maxUses.options.ten}</SelectItem>
              <SelectItem value="25">{t.teams.invite.settings.maxUses.options.twentyFive}</SelectItem>
              <SelectItem value="unlimited">{t.teams.invite.settings.maxUses.options.unlimited}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Link Display */}
      <AnimatePresence mode="wait">
        {inviteLink ? (
          <motion.div
            key="link-display"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
              }
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="rounded-lg border bg-muted/50 p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Link2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{t.teams.invite.link.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.teams.invite.link.subtitle[role as keyof typeof t.teams.invite.link.subtitle]}
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">{t.teams.invite.link.status.active}</Badge>
            </div>

            <div className="flex gap-2">
              <TextShimmer duration={2} className="flex-1">
                <Input
                  value={inviteLink}
                  readOnly
                  className={cn(
                    "font-mono text-sm bg-white transition-colors",
                    isCopying && "bg-primary/5 text-primary"
                  )}
                />
              </TextShimmer>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={copyLink}
                disabled={isCopying}
              >
                <AnimatePresence mode="wait">
                  {isCopying ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <motion.svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-green-500"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.path d="M20 6L9 17L4 12" />
                      </motion.svg>
                    </motion.div>
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </AnimatePresence>
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-2">
              {expiration !== 'never' && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    {t.teams.invite.link.expiration.replace(
                      '{{date}}',
                      format(getExpirationDate()!, 'MMM d, h:mm a')
                    )}
                  </span>
                </div>
              )}
              {uses !== 'unlimited' && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>
                    {t.teams.invite.link.uses.replace('{{count}}', uses)}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="rounded-lg border-2 border-dashed p-8 text-center relative overflow-hidden"
          >
            <motion.div
              className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center"
            >
              {isGenerating ? (
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
              ) : (
                <Share2 className="h-6 w-6 text-primary" />
              )}
            </motion.div>
            
            <motion.h3 
              className="mb-1 font-medium"
              animate={isGenerating ? {
                opacity: [0, 1],
                transition: {
                  duration: 1.2,
                  repeat: Infinity,
                }
              } : {}}
            >
              {isGenerating ? t.teams.invite.link.generating : t.teams.invite.link.empty}
            </motion.h3>
            
            <Button 
              onClick={generateLink} 
              disabled={isGenerating}
              className="relative mt-4"
            >
              <motion.span className="flex items-center">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.teams.invite.link.generatingButton}
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    {t.teams.invite.link.generateButton}
                  </>
                )}
              </motion.span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          {t.teams.invite.link.done}
        </Button>
      </div>
    </div>
  );
}

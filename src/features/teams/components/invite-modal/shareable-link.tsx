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
      toast.success('New invite link generated');
    } catch (error) {
      toast.error('Failed to generate link');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyLink = async () => {
    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(inviteLink);
      toast.success('Link copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy link');
    } finally {
      setTimeout(() => setIsCopying(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Settings */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Role</p>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Expires in</p>
          <Select value={expiration} onValueChange={setExpiration}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 hours</SelectItem>
              <SelectItem value="7d">7 days</SelectItem>
              <SelectItem value="30d">30 days</SelectItem>
              <SelectItem value="never">Never</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Max uses</p>
          <Select value={uses} onValueChange={setUses}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 use</SelectItem>
              <SelectItem value="5">5 uses</SelectItem>
              <SelectItem value="10">10 uses</SelectItem>
              <SelectItem value="25">25 uses</SelectItem>
              <SelectItem value="unlimited">Unlimited</SelectItem>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.2 }
              }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Link2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Invite Link</p>
                  <p className="text-xs text-muted-foreground">Anyone with this link can join as {role}</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">Active</Badge>
            </motion.div>

            <div className="flex gap-2">
              <TextShimmer duration={2} className="flex-1 rounded-[8px]">
                <Input
                  value={inviteLink}
                  readOnly
                  className={cn(
                    "font-mono text-sm bg-main transition-colors",
                    isCopying && "bg-primary/5 text-primary"
                  )}
                />
              </TextShimmer>
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={copyLink}
                  className="relative"
                  disabled={isCopying}
                >
                  <AnimatePresence mode="wait">
                    {isCopying ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 20
                        }}
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
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <motion.path d="M20 6L9 17L4 12" />
                        </motion.svg>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 20
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Success ripple effect */}
                  <AnimatePresence>
                    {isCopying && (
                      <motion.span
                        className="absolute inset-0 rounded-md border-2 border-green-500"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: [0, 0.2, 0],
                          scale: [0.8, 1.3, 1.5],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut"
                        }}
                      />
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              {expiration !== 'never' && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Expires {format(getExpirationDate()!, 'MMM d, h:mm a')}</span>
                </div>
              )}
              {uses !== 'unlimited' && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{uses} {parseInt(uses) === 1 ? 'use' : 'uses'} remaining</span>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
              }
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="rounded-lg border-2 border-dashed p-8 text-center relative overflow-hidden"
          >
            <motion.div
              animate={isGenerating ? {
                scale: [1, 1.2, 1],
                rotate: [0, 360],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              } : {}}
              className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center"
            >
              {isGenerating ? (
                <motion.div
                  animate={{
                    rotate: 360,
                    transition: {
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                >
                  <Loader2 className="h-6 w-6 text-primary" />
                </motion.div>
              ) : (
                <Share2 className="h-6 w-6 text-primary" />
              )}
            </motion.div>
            
            {/* Celebration particles when generating */}
            {isGenerating && (
              <>
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-8 h-8 rounded-full bg-primary left-[44%]"
                    initial={{ 
                      opacity: 0.1,
                      x: "50%",
                      y: "50%"
                    }}
                    animate={{
                      opacity: 0,
                      x: `${50 + Math.cos(i * 30 * Math.PI / 180) * 100}%`,
                      y: `${50 + Math.sin(i * 30 * Math.PI / 180) * 100}%`,
                      transition: {
                        duration: 0.8,
                        ease: "easeOut",
                        delay: i * 0.02
                      }
                    }}
                  />
                ))}
              </>
            )}
            
            <motion.h3 
              className="mb-1 font-medium"
              animate={isGenerating ? {
                // scale: [1, 1.1, 1],
                opacity:[0, 1, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                }
              } : {}}
            >
              {isGenerating ? "Creating your invite link..." : "No active invite link"}
            </motion.h3>
            <motion.p 
              className="text-sm text-muted-foreground mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={isGenerating ? {
                opacity:[0, 1, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                },
                y: 0
              } : { opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {isGenerating ? "This will only take a moment" : "Generate a link to invite team members"}
            </motion.p>
            <Button 
              onClick={generateLink} 
              disabled={isGenerating}
              className="relative"
            >
              <motion.span
                className="absolute inset-0 rounded-md bg-primary"
                initial={false}
                animate={isGenerating ? {
                  opacity: [0, 0.3, 0],
                  scaleX: [1, 1.2],
                  scaleY: [1, 1.6],
                  display: "block",
                  transition: {
                    duration: 1,
                    repeat: Infinity,
                  }
                } : {
                  display: "none"
                }}
              />
              <motion.span
                className="flex items-center"
                animate={isGenerating ? {
                  scale: [0, 1],
                  transition: {
                    duration: 0,
                    // repeat: Infinity,
                  }
                } : {}}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate Link
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
          Done
        </Button>
      </div>
    </div>
  );
}
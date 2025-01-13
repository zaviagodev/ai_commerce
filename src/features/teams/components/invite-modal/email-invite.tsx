import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const emailSchema = z.object({
  emails: z.array(z.string().email('Invalid email address')),
  role: z.enum(['admin', 'editor', 'viewer']),
  expiration: z.enum(['24h', '7d', '30d', 'never']),
});

type EmailFormValues = z.infer<typeof emailSchema>;

interface EmailInviteProps {
  onOpenChange: (open: boolean) => void;
}

export function EmailInvite({ onOpenChange }: EmailInviteProps) {
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      emails: [],
      role: 'viewer',
      expiration: '7d',
    },
  });

  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const email = currentEmail.trim();
      
      if (email && !emails.includes(email) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setEmails([...emails, email]);
        setCurrentEmail('');
        form.setValue('emails', [...emails, email]);
      }
    } else if (e.key === 'Backspace' && !currentEmail && emails.length > 0) {
      const newEmails = emails.slice(0, -1);
      setEmails(newEmails);
      form.setValue('emails', newEmails);
    }
  };

  const removeEmail = (emailToRemove: string) => {
    const newEmails = emails.filter((email) => email !== emailToRemove);
    setEmails(newEmails);
    form.setValue('emails', newEmails);
  };

  const onSubmit = async (data: EmailFormValues) => {
    if (emails.length === 0) {
      toast.error('Please add at least one email address');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success(`Invitations sent to ${emails.length} email${emails.length > 1 ? 's' : ''}`);
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to send invitations');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="emails"
          render={() => (
            <FormItem>
              <FormLabel>Email Addresses</FormLabel>
              <FormControl>
                <div className="border rounded-lg p-2 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence>
                      {emails.map((email) => (
                        <motion.div
                          key={email}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Badge variant="secondary" className="gap-1">
                            {email}
                            <button
                              type="button"
                              className="ml-1 rounded-full"
                              onClick={() => removeEmail(email)}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  <Input
                    placeholder="Enter email addresses"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    onKeyDown={handleEmailKeyDown}
                    className="border-0 p-0 h-8 focus-visible:ring-0"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expiration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiration</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select expiration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="24h">24 hours</SelectItem>
                    <SelectItem value="7d">7 days</SelectItem>
                    <SelectItem value="30d">30 days</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading || emails.length === 0}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Invites
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
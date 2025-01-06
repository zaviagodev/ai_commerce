import { useState } from 'react';
import { Check, Copy, Link, Pencil, Eye, Crown, Image } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ShareModalProps {
  children: React.ReactNode;
  title: string;
  url: string;
  image?: string;
}

const PERMISSIONS = [
  {
    id: 'owner',
    name: 'Owner',
    description: 'Full access to edit and manage',
    icon: Crown,
    iconColor: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
  {
    id: 'editor',
    name: 'Editor',
    description: 'Can edit but not manage access',
    icon: Pencil,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Can only view',
    icon: Eye,
    iconColor: 'text-gray-500',
    bgColor: 'bg-gray-50',
  },
] as const;

export function ShareModal({ children, title, url, image }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [permission, setPermission] = useState('viewer');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent 
        className="sm:max-w-md top-[10%] translate-y-0" 
        aria-labelledby="share-dialog-title"
      >
        <DialogHeader className="flex flex-row items-start gap-4">
          <div className="relative h-16 w-16 shrink-0 rounded-lg border bg-muted overflow-hidden">
            {image ? (
              <img src={image} alt={title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Image className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <DialogTitle id="share-dialog-title">Share {title}</DialogTitle>
            <DialogDescription>Choose who can access this item</DialogDescription>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">Link</Label>
              <Input
                id="link"
                value={url}
                readOnly
                className="h-9"
              />
            </div>
            <Button 
              type="button" 
              size="sm" 
              className="px-3"
              onClick={handleCopy}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="sr-only">Copy link</span>
            </Button>
          </div>
          
          <div className="space-y-3">
            <Label>Permission</Label>
            <RadioGroup
              defaultValue={permission}
              onValueChange={setPermission}
              className="space-y-2"
            >
              {PERMISSIONS.map((item) => (
                <div key={item.id}>
                  <RadioGroupItem
                    value={item.id}
                    id={item.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={item.id}
                    className={cn(
                      "flex items-start gap-4 rounded-lg border p-4 hover:bg-accent cursor-pointer transition-colors",
                      "peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    )}
                  >
                    <div className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                      item.bgColor
                    )}>
                      <item.icon className={cn("h-5 w-5", item.iconColor)} />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium leading-none">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
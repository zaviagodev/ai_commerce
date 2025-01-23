import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ShoppingBag,
  Store,
  MessageCircle,
  ShoppingCart,
  Video,
  Globe,
} from "lucide-react";

const MARKETPLACES = [
  {
    id: "shopee",
    name: "Shopee",
    icon: ShoppingBag,
    color: "text-orange-500",
    bgColor: "bg-orange-100",
  },
  {
    id: "lazada",
    name: "Lazada",
    icon: Store,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    id: "lineoa",
    name: "Line OA",
    icon: MessageCircle,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    id: "linemyshop",
    name: "Line MyShop",
    icon: ShoppingCart,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: Video,
    color: "text-gray-900",
    bgColor: "bg-gray-100",
  },
  {
    id: "website",
    name: "Website",
    icon: Globe,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
];

interface SalesChannelsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeChannels: string[];
  onChannelToggle: (channelId: string) => void;
}

export function SalesChannelsDialog({
  open,
  onOpenChange,
  activeChannels,
  onChannelToggle,
}: SalesChannelsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Sales Channels</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4 p-1">
            {MARKETPLACES.map((marketplace) => (
              <div
                key={marketplace.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${marketplace.bgColor}`}
                  >
                    <marketplace.icon
                      className={`h-5 w-5 ${marketplace.color}`}
                    />
                  </div>
                  <Label htmlFor={marketplace.id} className="font-medium">
                    {marketplace.name}
                  </Label>
                </div>
                <Switch
                  id={marketplace.id}
                  checked={activeChannels.includes(marketplace.id)}
                  onCheckedChange={() => onChannelToggle(marketplace.id)}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

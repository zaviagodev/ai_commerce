import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, DollarSign, MapPin, Edit } from "lucide-react";

interface FreeShippingCardProps {
  onEdit: (id: string) => void;
}

export function FreeShippingCard({ onEdit }: FreeShippingCardProps) {
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div variants={item}>
      <Card className="relative overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"
          style={{
            maskImage: "radial-gradient(circle at 70% 30%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(circle at 70% 30%, black, transparent)",
          }}
        />

        {/* Content */}
        <div className="relative p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  On orders over $50
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Active
            </Badge>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>Minimum order: $50</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>All shipping zones</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Usage</p>
              <p className="text-2xl font-semibold">156</p>
              <p className="text-xs text-muted-foreground">orders shipped</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Saved</p>
              <p className="text-2xl font-semibold">$780</p>
              <p className="text-xs text-muted-foreground">in shipping fees</p>
            </div>
          </div>

          {/* Action Button */}
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => onEdit("free-shipping")}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Promotion
          </Button>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full bg-muted">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: "31.2%" }}
          />
        </div>
      </Card>
    </motion.div>
  );
}

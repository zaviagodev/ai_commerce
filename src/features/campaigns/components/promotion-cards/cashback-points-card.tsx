import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coins, Clock, DollarSign, Edit } from "lucide-react";

interface CashbackPointsCardProps {
  onEdit: (id: string) => void;
}

export function CashbackPointsCard({ onEdit }: CashbackPointsCardProps) {
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div variants={item}>
      <Card className="relative overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10"
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
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                <Coins className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold">5% Points Back</h3>
                <p className="text-sm text-muted-foreground">
                  On all purchases
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-yellow-100 text-yellow-700"
            >
              Active
            </Badge>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>Minimum order: $25</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Points expire in 90 days</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Points Awarded</p>
              <p className="text-2xl font-semibold">12,450</p>
              <p className="text-xs text-muted-foreground">to customers</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Value</p>
              <p className="text-2xl font-semibold">$124.50</p>
              <p className="text-xs text-muted-foreground">in rewards</p>
            </div>
          </div>

          {/* Action Button */}
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => onEdit("cashback-points")}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Promotion
          </Button>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full bg-muted">
          <div
            className="h-full bg-yellow-500 transition-all duration-500"
            style={{ width: "62.25%" }}
          />
        </div>
      </Card>
    </motion.div>
  );
}

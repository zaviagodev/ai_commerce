import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

interface SetAsDefaultModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  description?: string;
}

export function SetAsDefaultModal({
  open,
  onOpenChange,
  onConfirm,
  description,
}: SetAsDefaultModalProps) {
  const [isSetting, setIsSetting] = useState(false);

  const handleConfirm = async () => {
    setIsSetting(true);
    try {
      onConfirm();
      onOpenChange(false);
    } finally {
      setIsSetting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <DialogTitle>Set as default</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSetting}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleConfirm}
            disabled={isSetting}
          >
            {isSetting ? "Setting..." : "Set as Default"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

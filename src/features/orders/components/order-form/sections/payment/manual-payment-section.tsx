import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, X } from "lucide-react";
import { motion } from "framer-motion";
import { BankSelect } from "./bank-select";
import { useTranslation } from "@/lib/i18n/hooks";

interface ManualPaymentSectionProps {
  onConfirm: (data: { bankName: string; slipImage: string }) => void;
  onCancel: () => void;
}

export function ManualPaymentSection({
  onConfirm,
  onCancel,
}: ManualPaymentSectionProps) {
  const t = useTranslation();
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [slipImage, setSlipImage] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setSlipImage(previewUrl);
    } catch (error) {
      console.error("Failed to handle file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirm = () => {
    if (!selectedBank) return;
    onConfirm({ bankName: selectedBank, slipImage });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4 p-4 m-6 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700"
    >
      <BankSelect value={selectedBank} onValueChange={setSelectedBank} />

      <div className="space-y-2">
        <label className="text-sm text-gray-300">
          {t.orders.orders.form.sections.payment.manual.slipImage}
        </label>
        {slipImage ? (
          <div className="relative">
            <img
              src={slipImage}
              alt="Payment slip"
              className="w-full h-32 object-cover rounded-lg"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 bg-gray-900/50 hover:bg-gray-900/75"
              onClick={() => setSlipImage("")}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="relative">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="slip-upload"
              disabled={isUploading}
            />
            <label
              htmlFor="slip-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-500 transition-colors"
            >
              <ImagePlus className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-400">
                {isUploading
                  ? "Uploading..."
                  : t.orders.orders.form.sections.payment.manual.uploadPrompt}
              </span>
            </label>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="text-gray-300 hover:text-main hover:bg-gray-700"
        >
          {t.orders.orders.form.sections.payment.manual.cancel}
        </Button>
        <Button
          type="button"
          onClick={handleConfirm}
          disabled={!selectedBank}
          className="bg-green-600 hover:bg-green-700"
        >
          {t.orders.orders.form.sections.payment.manual.confirm}
        </Button>
      </div>
    </motion.div>
  );
}

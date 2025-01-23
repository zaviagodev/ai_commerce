import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/hooks";

interface PaymentHeaderProps {
  isCancelled: boolean;
  isPaid: boolean;
  isShipped: boolean;
  isProcessing: boolean;
}

export function PaymentHeader({
  isCancelled,
  isPaid,
  isShipped,
  isProcessing,
}: PaymentHeaderProps) {
  const t = useTranslation();

  return (
    <div className="relative px-6 py-4 border-b border-gray-700/50 z-10">
      {/* Shimmer effect */}
      <div
        className="absolute inset-0"
        style={{
          background: isCancelled
            ? "linear-gradient(to right, rgba(239, 68, 68, 0) 0%, rgba(239, 68, 68, 0.1) 50%, rgba(239, 68, 68, 0) 100%)"
            : isShipped
              ? "linear-gradient(to right, rgba(74, 222, 128, 0) 0%, rgba(74, 222, 128, 0.1) 50%, rgba(74, 222, 128, 0) 100%)"
              : "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%)",
          animation: "shimmer 2s infinite",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-sm text-main font-bold">
          {t.orders.orders.form.sections.payment.status.title}
        </span>
        <div className="flex items-center gap-2">
          <Badge
            variant={
              isCancelled
                ? "destructive"
                : isPaid || isShipped
                  ? "success"
                  : "warning"
            }
            className={`flex items-center gap-1.5 ${
              isCancelled
                ? "border-red-500/20 !bg-red-500/10 text-red-500"
                : isPaid || isShipped
                  ? "border-green-500/20 !bg-green-500/10 !text-green-500"
                  : "border-yellow-500/20 !bg-yellow-500/10 !text-yellow-500"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                  isCancelled
                    ? "!bg-red-400"
                    : isPaid || isShipped
                      ? "!bg-green-400"
                      : "!bg-yellow-400"
                }`}
              />
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  isCancelled
                    ? "!bg-red-500"
                    : isPaid || isShipped
                      ? "!bg-green-500"
                      : "!bg-yellow-500"
                }`}
              />
            </span>
            {isCancelled
              ? t.orders.orders.form.sections.payment.status.cancelled
              : isPaid || isShipped
                ? t.orders.orders.form.sections.payment.status.completed
                : t.orders.orders.form.sections.payment.status.outstanding}
          </Badge>
          {(isProcessing || isShipped) && (
            <Badge
              variant="secondary"
              className={`flex items-center gap-1.5 ${
                isShipped
                  ? "!bg-purple-500/10 text-purple-500 border-purple-500/20"
                  : "!bg-blue-500/10 text-blue-500 border-blue-500/20"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                    isShipped ? "bg-purple-400" : "bg-blue-400"
                  }`}
                />
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    isShipped ? "bg-purple-500" : "bg-blue-500"
                  }`}
                />
              </span>
              {isShipped
                ? t.orders.orders.form.sections.payment.status.shipped
                : t.orders.orders.form.sections.payment.status.processing}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

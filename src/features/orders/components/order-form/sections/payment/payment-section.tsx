import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useOrders } from "@/features/orders/hooks/use-orders";
import { useAuth } from "@/lib/auth/auth-hooks";
import { Order } from "@/types/order";
import { toast } from "sonner";
import { useTranslation } from "@/lib/i18n/hooks";

import { PaymentHeader } from "./components/payment-header";
import { AmountDisplay } from "./components/amount-display";
import { PaymentActions } from "./components/payment-actions";
import { AnimatedContainer } from "./animated-container";
import { ProgressLine } from "./progress-line";
import { SuccessAnimation } from "./success-animation";
import { PaymentTypeModal } from "./payment-type-modal";
import { OrderActionsModal } from "./order-actions-modal";
import { ManualPaymentSection } from "./manual-payment-section";
import { CheckoutLinkSection } from "./checkout-link-section";
import { ShippingTrackingSection } from "./shipping-tracking-section";

interface PaymentSectionProps {
  order: Order;
}

export function PaymentSection({ order }: PaymentSectionProps) {
  const t = useTranslation();
  const { updateOrder } = useOrders();
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showManualPayment, setShowManualPayment] = useState(false);
  const [showCheckoutLink, setShowCheckoutLink] = useState(false);
  const [showPaymentType, setShowPaymentType] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(
    null
  );
  const [isComplete, setIsComplete] = useState(false);
  const [showOrderActions, setShowOrderActions] = useState(false);
  const [showShippingTracking, setShowShippingTracking] = useState(false);
  const [showAmount, setShowAmount] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isCancelled, setIsCancelled] = useState(order.status === "cancelled");
  const [isShipped, setIsShipped] = useState(order.status === "shipped");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isPaid =
    order.status === "processing" ||
    Boolean(order.payment_details?.confirmed_at);
  const [displayText, setDisplayText] = useState(
    isPaid
      ? t.orders.orders.form.sections.payment.status.completed
      : t.orders.orders.form.sections.payment.status.outstanding
  );
  const isLocked = isPaid || isShipped;
  const gradientColor = isCancelled
    ? "rgba(239, 68, 68, 0.3)"
    : isLocked
    ? "rgba(74, 222, 128, 0.3)"
    : "rgba(250, 204, 21, 0.3)";

  // Effects
  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Only show initial status text on first load
    if (isInitialLoad) {
      if (isShipped) {
        setDisplayText(t.orders.orders.form.sections.payment.status.shipped);
      } else if (isPaid) {
        setDisplayText(t.orders.orders.form.sections.payment.status.completed);
      } else if (!isCancelled) {
        setDisplayText(
          t.orders.orders.form.sections.payment.status.outstanding
        );
      }
    }

    // Handle status changes
    if (!isInitialLoad) {
      if (isCancelled) {
        timer = setTimeout(() => {
          setDisplayText(
            t.orders.orders.form.sections.payment.status.cancelled
          );
        }, 4000);
      } else if (isShipped) {
        timer = setTimeout(() => {
          setDisplayText(t.orders.orders.form.sections.payment.status.shipped);
        }, 4000);
      } else if (isPaid) {
        timer = setTimeout(() => {
          setDisplayText(
            t.orders.orders.form.sections.payment.status.completed
          );
        }, 4000);
      } else {
        timer = setTimeout(() => {
          setDisplayText(
            t.orders.orders.form.sections.payment.status.outstanding
          );
        }, 4000);
      }
    }

    return () => clearTimeout(timer);
  }, [isPaid, isInitialLoad, isCancelled, isShipped, t]);

  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  // Handlers
  const handleManualPaymentConfirm = async (data: {
    bankName: string;
    slipImage: string;
  }) => {
    setIsSaving(true);
    setShowManualPayment(false);

    try {
      await updateOrder.mutateAsync({
        id: order.id,
        data: {
          status: "processing",
          payment_details: {
            type: "bank_transfer",
            bank_name: data.bankName,
            slip_image: data.slipImage,
            confirmed_at: new Date().toISOString(),
          },
        },
      });
      toast.success(
        t.orders.orders.form.sections.payment.messages.paymentSuccess
      );
    } catch (error) {
      console.error("Failed to update order:", error);
      toast.error(t.orders.orders.form.sections.payment.messages.paymentError);
      setIsSaving(false);
    }
  };

  const handleShippingTrackingConfirm = async (data: {
    courier: string;
    trackingNumber: string;
  }) => {
    setIsSaving(true);
    setShowShippingTracking(false);
    setIsTransitioning(true);

    try {
      await updateOrder.mutateAsync({
        id: order.id,
        data: {
          status: "shipped",
          shipping_details: {
            courier: data.courier,
            tracking_number: data.trackingNumber,
            shipped_at: new Date().toISOString(),
          },
        },
      });
      setIsShipped(true);
      toast.success(
        t.orders.orders.form.sections.payment.messages.shippingSuccess
      );
    } catch (error) {
      console.error("Failed to update order:", error);
      toast.error(t.orders.orders.form.sections.payment.messages.shippingError);
      setIsSaving(false);
      setIsTransitioning(false);
    }
  };

  const handleProgressComplete = () => {
    setTimeout(() => {
      setIsSaving(false);
      setShowAmount(false);
      setIsComplete(true);
      setIsCancelled(order.status === "cancelled");

      setTimeout(() => {
        setIsComplete(false);
        setShowAmount(true);
      }, 2000);
    }, 500);
  };

  const handlePaymentTypeSelect = (type: string) => {
    setSelectedPaymentType(type);
    setShowCheckoutLink(type === "checkout");
    setShowManualPayment(type === "manual");
    setIsModalOpen(false);
  };

  const handleStatusChange = async (newStatus: string) => {
    setIsTransitioning(true);
    setIsSaving(true);
    setShowAmount(false);
    try {
      await updateOrder.mutateAsync({
        id: order.id,
        data: { status: newStatus },
      });
      setIsCancelled(newStatus === "cancelled");
      toast.success(
        newStatus === "cancelled"
          ? t.orders.orders.form.sections.payment.messages.cancelSuccess
          : t.orders.orders.form.sections.payment.messages.reopenSuccess
      );
    } catch (error) {
      console.error(
        `Failed to ${newStatus === "cancelled" ? "cancel" : "reopen"} order:`,
        error
      );
      toast.error(
        newStatus === "cancelled"
          ? t.orders.orders.form.sections.payment.messages.cancelError
          : t.orders.orders.form.sections.payment.messages.reopenError
      );
    } finally {
      setIsTransitioning(false);
    }
  };

  return (
    <AnimatedContainer>
      <div className="rounded-lg bg-gray-900 text-main overflow-hidden relative">
        {/* Background gradient */}
        <motion.div
          className="absolute w-[200%] h-[200%] left-1/2 -translate-x-1/2 pointer-events-none"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            background: isCancelled
              ? `radial-gradient(circle at center, ${gradientColor} 0%, ${gradientColor.replace(
                  "0.3",
                  "0.1"
                )} 40%, transparent 70%)`
              : `radial-gradient(circle at center, ${gradientColor} 0%, ${gradientColor.replace(
                  "0.3",
                  "0.1"
                )} 40%, transparent 70%)`,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            background: {
              duration: 0.5,
              ease: "easeInOut",
            },
          }}
        />

        <PaymentHeader
          isCancelled={isCancelled}
          isPaid={isPaid}
          isShipped={isShipped}
          isProcessing={order.status === "processing"}
        />

        <AmountDisplay
          amount={order.total}
          showAmount={showAmount}
          displayText={displayText}
          isCancelled={isCancelled}
          isShipped={isShipped}
          isPaid={isPaid}
          isInitialLoad={isInitialLoad}
          isTransitioning={isTransitioning}
        />

        <div className={isComplete ? "pt-0" : "pt-[164px]"}>
          {isSaving && (
            <ProgressLine
              onComplete={handleProgressComplete}
              isCancelled={order.status === "cancelled"}
              isShipped={isShipped}
            />
          )}

          {isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <SuccessAnimation
                onComplete={() => setIsComplete(false)}
                isCancelled={order.status === "cancelled"}
                isShipped={isShipped}
              />
            </motion.div>
          )}

          <PaymentActions
            isSaving={isSaving}
            isCancelled={isCancelled}
            isPaid={isLocked}
            showPaymentType={showPaymentType}
            order={order}
            onPaymentClick={() => setShowPaymentType(true)}
            onActionsClick={() => setShowOrderActions(true)}
            onShippingClick={() => setShowShippingTracking(true)}
            onReopenClick={() => handleStatusChange("pending")}
          />

          {/* Additional sections */}
          {showShippingTracking && (
            <ShippingTrackingSection
              onConfirm={handleShippingTrackingConfirm}
              onCancel={() => setShowShippingTracking(false)}
            />
          )}

          {showCheckoutLink && (
            <CheckoutLinkSection
              orderId={order.id}
              onCancel={() => setShowCheckoutLink(false)}
            />
          )}

          {showManualPayment && (
            <ManualPaymentSection
              onConfirm={handleManualPaymentConfirm}
              onCancel={() => setShowManualPayment(false)}
            />
          )}

          {/* Modals */}
          <PaymentTypeModal
            open={showPaymentType}
            onOpenChange={setShowPaymentType}
            order={order}
            onManualPaymentSelect={() => handlePaymentTypeSelect("manual")}
            onCheckoutLinkSelect={() => handlePaymentTypeSelect("checkout")}
          />

          <OrderActionsModal
            open={showOrderActions}
            onOpenChange={setShowOrderActions}
            order={order}
            onStatusChange={handleStatusChange}
            onSavingChange={setIsSaving}
          />
        </div>
      </div>
    </AnimatedContainer>
  );
}

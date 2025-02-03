import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  MoreHorizontal,
  RefreshCw,
  Eye,
  ExternalLink,
  Check,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/hooks";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useOrderPayment } from "@/features/orders/hooks/use-order-payment";
import { Order } from "@/types/order";

interface PaymentActionsProps {
  isSaving: boolean;
  isCancelled: boolean;
  isPaid: boolean;
  order: Order;
  onPaymentClick: () => void;
  onActionsClick: () => void;
  onShippingClick: () => void;
  onReopenClick: () => void;
  onPaymentConfirmed?: () => void;
}

export function PaymentActions({
  isSaving,
  isCancelled,
  isPaid,
  order,
  onPaymentClick,
  onActionsClick,
  onShippingClick,
  onReopenClick,
  onPaymentConfirmed,
}: PaymentActionsProps) {
  const t = useTranslation();
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const { confirmPayment } = useOrderPayment();

  if (isSaving) return null;

  const isPending = order.status === "pending";
  const hasPaymentDetails = !!order.payment_details;
  const hasSlip = !!order.payment_details?.slip_image;

  const handleConfirmPayment = async () => {
    try {
      setIsConfirming(true);
      await confirmPayment({
        orderId: order.id,
        order,
      });
      onPaymentConfirmed?.();
    } catch (error) {
      // Error is handled by the mutation
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <motion.div
      className="relative px-6 py-4 bg-gray-800/30 z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      {!isCancelled && (
        <motion.div
          className="flex gap-2"
          initial={false}
          animate={{ opacity: 1 }}
        >
          <AnimatePresence mode="wait">
            {!hasPaymentDetails ? (
              <motion.div
                key="payment-button"
                className="w-full"
                initial={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="outline"
                  className="w-full bg-gray-800 border-gray-700 text-main hover:bg-gray-700"
                  onClick={onPaymentClick}
                  type="button"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  {t.orders.orders.form.sections.payment.types.title}
                </Button>
              </motion.div>
            ) : isPending && hasSlip ? (
              <div className="flex flex-col items-center w-full gap-2">
                <motion.div
                  key="slip-preview"
                  className="w-1/2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="relative aspect-[1/1] w-full overflow-hidden rounded-lg border border-gray-700 max-h-[200px]">
                    {order.payment_details?.slip_image && (
                      <>
                        <img
                          src={order.payment_details.slip_image}
                          alt="Payment slip"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                          <Dialog
                            open={isImageOpen}
                            onOpenChange={setIsImageOpen}
                          >
                            <DialogTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <div className="relative aspect-[3/4] w-full overflow-hidden">
                                <img
                                  src={order.payment_details.slip_image}
                                  alt="Payment slip"
                                  className="w-full object-contain"
                                />
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button size="icon" variant="ghost" asChild>
                            <a
                              href={order.payment_details.slip_image}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
                <motion.div
                  key="confirm-button"
                  className="w-1/2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Button
                    variant="outline"
                    className="h-full w-full bg-gray-800 border-gray-700 text-main hover:bg-gray-700"
                    onClick={handleConfirmPayment}
                    disabled={isConfirming}
                    type="button"
                  >
                    {isConfirming ? (
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white" />
                        Processing...
                      </div>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Confirm Payment
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            ) : (
              <div className="flex w-full gap-2">
                {/* <motion.div
                  key="actions-button"
                  className="w-1/2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.1, duration: 0.3 }}
                >
                  <Button
                    variant="outline"
                    className="w-full bg-gray-800 border-gray-700 text-main hover:bg-gray-700"
                    onClick={onActionsClick}
                    type="button"
                  >
                    <MoreHorizontal className="mr-2 h-4 w-4" />
                    {t.orders.orders.payment.actions.title}
                  </Button>
                </motion.div> */}
                <motion.div
                  key="shipping-button"
                  className="w-1/2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.6, duration: 0.3 }}
                >
                  <Button
                    variant="outline"
                    className="w-full bg-gray-800 border-gray-700 text-main hover:bg-gray-700"
                    onClick={onShippingClick}
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M21 5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5z" />
                      <path d="M3 7h18" />
                      <path d="M7 5v4" />
                      <path d="M17 5v4" />
                    </svg>
                    {t.orders.orders.payment.shipping.addTracking}
                  </Button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {isCancelled && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 2.5,
              duration: 0.3,
            },
          }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex gap-2 w-full"
        >
          <Button
            variant="outline"
            className="w-1/2 bg-gray-800 border-gray-700 text-main hover:bg-gray-700"
            onClick={onReopenClick}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {t.orders.orders.actions.reopen}
          </Button>
          {/* <Button
            variant="outline"
            className="w-1/2 bg-gray-800 border-gray-700 text-main hover:bg-gray-700"
            onClick={onActionsClick}
          >
            <MoreHorizontal className="mr-2 h-4 w-4" />
            {t.orders.orders.payment.actions.title}
          </Button> */}
        </motion.div>
      )}
    </motion.div>
  );
}

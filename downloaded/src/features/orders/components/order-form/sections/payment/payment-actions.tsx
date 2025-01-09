interface PaymentActionsProps {
  isSaving: boolean;
  isCancelled: boolean;
  isPaid: boolean;
  showPaymentType: boolean;
  order: Order;
  onPaymentClick: () => void;
  onActionsClick: () => void;
  onShippingClick: () => void;
  onReopenClick: () => void;
}

const getShippingButtonText = (isPaid: boolean, isShipped: boolean) => {
  if (isShipped) return 'Add More Shipment';
  if (isPaid) return 'Add Shipping';
  return '';
};

export function PaymentActions({
  isSaving,
  isCancelled,
  isPaid,
  showPaymentType,
  order,
  onPaymentClick,
  onActionsClick,
  onShippingClick,
  onReopenClick,
}: PaymentActionsProps) {
  if (isSaving) return null;
  const isShipped = order.status === 'shipped';

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
          animate={{ opacity: showPaymentType ? 0 : 1 }}
        >
          <AnimatePresence mode="wait">
            {!isPaid ? (
              <motion.div
                key="payment-button"
                className="w-full"
                initial={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="outline"
                  className="w-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                  onClick={onPaymentClick}
                  type="button"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Select Payment Type
                </Button>
              </motion.div>
            ) : (
              <div className="flex w-full gap-2">
                <motion.div
                  key="actions-button"
                  className="w-1/2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3, duration: 0.3 }}
                >
                  <Button
                    variant="outline"
                    className="w-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                    onClick={onActionsClick}
                    type="button"
                  >
                    <MoreHorizontal className="mr-2 h-4 w-4" />
                    Order Actions
                  </Button>
                </motion.div>
                <motion.div
                  key="shipping-button"
                  className="w-1/2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.5, duration: 0.3 }}
                >
                  <Button
                    variant="outline"
                    className="w-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
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
                    {getShippingButtonText(isPaid, order.status === 'shipped')}
                  </Button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}

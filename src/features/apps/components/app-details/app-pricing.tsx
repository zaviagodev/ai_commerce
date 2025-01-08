import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PLANS = [
  {
    name: 'Starter',
    price: 49.99,
    description: 'Perfect for small businesses just getting started',
    features: [
      'Up to 1,000 SKUs',
      'Basic inventory tracking',
      'Email support',
      'Basic reporting',
      'Single warehouse',
    ],
  },
  {
    name: 'Professional',
    price: 99.99,
    description: 'Ideal for growing businesses with multiple locations',
    features: [
      'Up to 10,000 SKUs',
      'Advanced inventory tracking',
      'Priority support',
      'Advanced analytics',
      'Multi-warehouse support',
      'Automated reordering',
      'API access',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 199.99,
    description: 'For large businesses with complex needs',
    features: [
      'Unlimited SKUs',
      'Custom features',
      '24/7 phone support',
      'Custom reporting',
      'Unlimited warehouses',
      'Advanced API access',
      'Dedicated account manager',
      'Custom integrations',
    ],
  },
];

export function AppPricing() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold">Simple, transparent pricing</h2>
        <p className="mt-2 text-muted-foreground">
          Choose the plan that best fits your business needs
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-3">
        {PLANS.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`relative rounded-2xl border bg-gradient-to-b from-white to-gray-50/50 p-8 ${
              plan.popular ? 'border-primary shadow-lg' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div>
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">{plan.description}</p>

              <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                Get Started
              </Button>

              <div className="space-y-2 pt-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
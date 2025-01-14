import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Package, Users, ShoppingCart, Store, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ONBOARDING_STEPS = [
  {
    id: 'product',
    title: 'Add your first product',
    description: 'Start by adding products to your store',
    icon: Package,
    color: 'bg-blue-500',
    route: '/dashboard/products/new',
  },
  {
    id: 'customer',
    title: 'Create your first customer',
    description: 'Add customer information to your store',
    icon: Users,
    color: 'bg-purple-500',
    route: '/dashboard/customers/new',
  },
  {
    id: 'store',
    title: 'Setup your store',
    description: 'Configure your store settings',
    icon: Store,
    color: 'bg-green-500',
    route: '/dashboard/settings/ecommerce',
  },
  {
    id: 'order',
    title: 'Create your first order',
    description: 'Start managing orders in your store',
    icon: ShoppingCart,
    color: 'bg-orange-500',
    route: '/dashboard/orders/new',
  },
] as const;

export function OnboardingGuide() {
  const [isStarted, setIsStarted] = useState(false);
  const navigate = useNavigate();

  return (
    <Card className="relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"
        style={{
          maskImage: 'radial-gradient(circle at center, black, transparent)',
          WebkitMaskImage: 'radial-gradient(circle at center, black, transparent)',
        }}
      />

      {/* Content */}
      <div className="relative p-6">
        {!isStarted ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl font-semibold mb-2">
              Welcome to Your Store
            </h2>
            <p className="text-muted-foreground mb-6">
              Let's get started with setting up your store for success
            </p>
            <Button 
              size="lg"
              onClick={() => setIsStarted(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Start Setup Guide
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ONBOARDING_STEPS.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="group relative overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(step.route)}
                  >
                    {/* Card content */}
                    <div className="p-6">
                      <div className={`${step.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-main transition-transform group-hover:scale-110`}>
                        <step.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-medium mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
}
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';

// Auth Components
import { SignUpForm } from '@/components/auth/signup-form';
import { LoginForm } from '@/components/auth/login-form';
import { AuthRoute, ProtectedRoute } from '@/components/auth/auth-routes';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

// Store Components
import { StorePage } from '@/features/store/pages/store-page';
import { ProductPage } from '@/features/store/pages/product-page';
import { CheckoutPage } from '@/features/store/pages/checkout-page';
import { CartProvider } from '@/features/store/context/cart-context';

// Product Features
import { ProductsPage } from '@/features/products/pages/products-page';
import { NewProductPage } from '@/features/products/pages/new-product-page';
import { EditProductPage } from '@/features/products/pages/edit-product-page';
import { CategoriesPage } from '@/features/products/pages/categories-page';
import { NewCategoryPage } from '@/features/products/pages/new-category-page';
import { EditCategoryPage } from '@/features/products/pages/edit-category-page';
import { Products2Page } from '@/features/products2/pages/products2-page';

// Customer Features
import { CustomersPage } from '@/features/customers/pages/customers-page';
import { NewCustomerPage } from '@/features/customers/pages/new-customer-page';
import { EditCustomerPage } from '@/features/customers/pages/edit-customer-page';
import { CustomerTiersPage } from '@/features/customers/pages/customer-tiers-page';
import { NewCustomerTierPage } from '@/features/customers/pages/new-customer-tier-page';
import { EditCustomerTierPage } from '@/features/customers/pages/edit-customer-tier-page';
import { CustomerGroupsPage } from '@/features/customers/pages/customer-groups-page';
import { NewCustomerGroupPage } from '@/features/customers/pages/new-customer-group-page';
import { EditCustomerGroupPage } from '@/features/customers/pages/edit-customer-group-page';

// Order Features
// Campaign Features
import { CampaignsPage } from '@/features/campaigns/pages/campaigns-page';
import { EditRedeemPage } from '@/features/points/pages/edit-redeem-page';
import { NewCampaignPage } from '@/features/campaigns/pages/new-campaign-page';
import { EditCampaignPage } from '@/features/campaigns/pages/edit-campaign-page';
import { RedeemListPage } from '@/features/points/pages/redeem-list-page';

import { OrdersPage } from '@/features/orders/pages/orders-page';
import { NewOrderPage } from '@/features/orders/pages/new-order-page';
import { EditOrderPage } from '@/features/orders/pages/edit-order-page';

// Settings Features
import { SettingsPage } from '@/features/settings/pages/settings-page';
import { EcommerceSettingsPage } from '@/features/settings/pages/ecommerce-settings-page';
import { PaymentSettingsPage } from '@/features/settings/pages/payments-settings-page';

// Dashboard Features
import { DashboardPage } from '@/features/dashboard/pages/dashboard-page';
import { CustomPage } from '@/features/custom-page';

export default function App() {
  return (
    <TooltipProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Store Routes */}
            <Route path="/store/:storeName" element={<StorePage />} />
            <Route path="/store/:storeName/products/:productId" element={<ProductPage />} />
            <Route path="/store/:storeName/checkout" element={<CheckoutPage />} />

            {/* Auth Routes */}
            <Route path="/auth/login" element={<AuthRoute><LoginForm /></AuthRoute>} />
            <Route path="/auth/signup" element={<AuthRoute><SignUpForm /></AuthRoute>} />

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<DashboardPage />} />
              
              {/* Product Routes */}
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/new" element={<NewProductPage />} />
              <Route path="products/:id" element={<EditProductPage />} />
              <Route path="products/categories" element={<CategoriesPage />} />
              <Route path="products/categories/new" element={<NewCategoryPage />} />
              <Route path="products/categories/:id" element={<EditCategoryPage />} />

              {/* Event & Ticket Routes */}
              <Route path="products2" element={<Products2Page />} />
              <Route path="products2/new" element={<NewProductPage />} />
              <Route path="products2/:id" element={<EditProductPage />} />

              {/* Customer Routes */}
              <Route path="customers" element={<CustomersPage />} />
              <Route path="customers/new" element={<NewCustomerPage />} />
              <Route path="customers/:id" element={<EditCustomerPage />} />
              <Route path="customers/tiers" element={<CustomerTiersPage />} />
              <Route path="customers/tiers/new" element={<NewCustomerTierPage />} />
              <Route path="customers/tiers/:id" element={<EditCustomerTierPage />} />
              <Route path="customers/groups" element={<CustomerGroupsPage />} />
              <Route path="customers/groups/new" element={<NewCustomerGroupPage />} />
              <Route path="customers/groups/:id" element={<EditCustomerGroupPage />} />

              {/* Order Routes */}
              <Route path="orders" element={<OrdersPage />} />
              <Route path="orders/new" element={<NewOrderPage />} />
              <Route path="orders/:id" element={<EditOrderPage />} />

              {/* Points & Rewards Routes */}
              <Route path="points/campaigns" element={<CampaignsPage />} />
              <Route path="points/campaigns/new" element={<NewCampaignPage />} />
              <Route path="points/campaigns/:id" element={<EditCampaignPage />} />
              <Route path="points/redeem" element={<RedeemListPage />} />
              <Route path="points/redeem/:id" element={<EditRedeemPage />} />

              {/* Settings Routes */}
              <Route path="settings" element={<SettingsPage />}>
                <Route index element={<Navigate to="ecommerce" replace />} />
                <Route path="ecommerce" element={<EcommerceSettingsPage />} />
                <Route path="payments" element={<PaymentSettingsPage />} />
              </Route>

              <Route path="custom" element={<CustomPage />} />
            </Route>

            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
          <Toaster />
        </Router>
      </CartProvider>
    </TooltipProvider>
  );
}
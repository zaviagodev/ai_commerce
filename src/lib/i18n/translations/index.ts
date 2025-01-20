import { dashboard } from './features/dashboard';
import { ecommerce } from './features/settings/ecommerce';
import { payments } from './features/settings/payments';
import { teams } from './features/teams';
import { navbar } from './features/navigation';
import { settingsNav } from './features/settings/settings_nav';
import { products } from './features/products';
import { settings } from './features/settings/settings';
import { orders } from './features/orders';
import { customer } from './features/customers';
import { events } from './features/events';


export const translations = {
  'en-US': {
    dashboard: dashboard.en,
    settings: {
      ecommerce: ecommerce.en,
      payments: payments.en,
      nav: settingsNav.en,
      settings: settings.en,
    },
    teams: teams.en,
    navigation: navbar.en,
    products: products.en,
    orders: orders.en,
    customers: customer.en,
    events: events.en,
  },
  'th-TH': {
    dashboard: dashboard.th,
    settings: {
      ecommerce: ecommerce.th,
      payments: payments.th,
      nav: settingsNav.th,
      settings: settings.th,
    },
    teams: teams.th,
    navigation: navbar.th,
    products: products.th,
    orders: orders.th,
    events: events.th,
    customers: customer.th,
  },
} as const;

export type Language = keyof typeof translations;

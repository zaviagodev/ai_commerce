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
import { campaign } from './features/campaigns';
import { pagination } from './features/pagination';
import { rewardItems } from './features/reward-items';
import { redeemList } from './features/redeem-list';

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
    campaigns: campaign.en,
    pagination: pagination.en,
    rewardItems: rewardItems.en,
    redeemList: redeemList.en
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
    campaigns: campaign.th,
    pagination: pagination.th,
    rewardItems: rewardItems.th,
    redeemList: redeemList.th
  },
} as const;

export type Language = keyof typeof translations;

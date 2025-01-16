import { dashboard } from './features/dashboard';
import { ecommerce } from './features/settings/ecommerce';


export const translations = {
  'en-US': {
    navigation: {
      dashboard: 'Dashboard',
      products: 'Products',
      customers: 'Customers',
      orders: 'Orders',
      settings: 'Settings',
    },
    dashboard: dashboard.en,
    settings: {
      ecommerce: ecommerce.en,
    }
  },
  'th-TH': {
    navigation: {
      dashboard: 'แดชบอร์ด',
      products: 'สินค้า',
      customers: 'ลูกค้า',
      orders: 'คำสั่งซื้อ',
      settings: 'ตั้งค่า',
    },
    dashboard: dashboard.th,
    settings: {
      ecommerce: ecommerce.th,
    }
  },
} as const;

export type Language = keyof typeof translations;

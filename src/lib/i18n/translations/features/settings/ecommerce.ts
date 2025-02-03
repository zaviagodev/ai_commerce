export const ecommerce = {
  en: {
    title: "E-commerce Settings",
    subtitle: "Configure your store's e-commerce settings",
    general: {
      title: "General Settings",
      subtitle: "Configure basic store settings",
      currency: {
        label: "Currency",
        description: "Choose your store's currency",
      },
      weightUnit: {
        label: "Weight Unit",
        description: "Choose your preferred weight unit",
      },
      dimensionUnit: {
        label: "Dimension Unit",
        description: "Choose your preferred dimension unit",
      },
      orderPrefix: {
        label: "Order Number Prefix",
        description: "This prefix will be added to all order numbers",
      },
      loyaltyPointsRate: {
        label: "Loyalty Points Rate",
        description: "1$ = x points",
      },
    },
    checkout: {
      title: "Checkout Settings",
      subtitle: "Configure checkout process settings",
      guestCheckout: {
        label: "Guest Checkout",
        description: "Allow customers to check out without creating an account",
      },
      requirePhone: {
        label: "Require Phone Number",
        description: "Make phone number mandatory during checkout",
      },
      requireShipping: {
        label: "Require Shipping Address",
        description: "Make shipping address mandatory for all orders",
      },
      requireBilling: {
        label: "Require Billing Address",
        description: "Make billing address mandatory for all orders",
      },
    },
    inventory: {
      title: "Inventory Settings",
      subtitle: "Configure inventory management settings",
      trackInventory: {
        label: "Track Inventory",
        description: "Enable inventory tracking for products",
      },
      lowStockThreshold: {
        label: "Low Stock Threshold",
        description: "Get notified when product stock falls below this number",
      },
      outOfStockBehavior: {
        label: "Out of Stock Behavior",
        description: "How to handle products when they are out of stock",
        options: {
          hide: "Hide product",
          show: "Show as out of stock",
          backorder: "Allow backorders",
        },
      },
    },
    tax: {
      title: "Tax Settings",
      subtitle: "Configure tax calculation settings",
      taxCalculation: {
        label: "Tax Calculation",
        description: "How tax should be calculated for orders",
        options: {
          lineItems: "Per Line Item",
          total: "On Order Total",
        },
      },
      taxInclusive: {
        label: "Tax Inclusive Pricing",
        description: "Display prices with tax included",
      },
      defaultTaxRate: {
        label: "Default Tax Rate (%)",
        description: "Default tax rate to apply when no specific rate is set",
      },
    },
    shipping: {
      title: "Shipping Settings",
      subtitle: "Configure shipping methods and rates",
      comingSoon: "Shipping settings will be available soon",
    },
  },
  th: {
    title: "การตั้งค่าอีคอมเมิร์ซ",
    subtitle: "กำหนดค่าอีคอมเมิร์ซของร้านค้าของคุณ",
    general: {
      title: "การตั้งค่าทั่วไป",
      subtitle: "กำหนดค่าพื้นฐานของร้านค้า",
      currency: {
        label: "สกุลเงิน",
        description: "เลือกสกุลเงินของร้านค้า",
      },
      weightUnit: {
        label: "หน่วยน้ำหนัก",
        description: "เลือกหน่วยน้ำหนักที่ต้องการ",
      },
      dimensionUnit: {
        label: "หน่วยขนาด",
        description: "เลือกหน่วยขนาดที่ต้องการ",
      },
      orderPrefix: {
        label: "คำนำหน้าเลขที่คำสั่งซื้อ",
        description: "คำนำหน้านี้จะถูกเพิ่มในทุกเลขที่คำสั่งซื้อ",
      },
    },
    checkout: {
      title: "การตั้งค่าการชำระเงิน",
      subtitle: "กำหนดค่ากระบวนการชำระเงิน",
      guestCheckout: {
        label: "การชำระเงินแบบไม่ต้องสมัครสมาชิก",
        description: "อนุญาตให้ลูกค้าชำระเงินโดยไม่ต้องสร้างบัญชี",
      },
      requirePhone: {
        label: "ต้องการเบอร์โทรศัพท์",
        description: "กำหนดให้ต้องใส่เบอร์โทรศัพท์ระหว่างการชำระเงิน",
      },
      requireShipping: {
        label: "ต้องการที่อยู่จัดส่ง",
        description: "กำหนดให้ต้องใส่ที่อยู่จัดส่งสำหรับทุกคำสั่งซื้อ",
      },
      requireBilling: {
        label: "ต้องการที่อยู่เรียกเก็บเงิน",
        description: "กำหนดให้ต้องใส่ที่อยู่เรียกเก็บเงินสำหรับทุกคำสั่งซื้อ",
      },
    },
    inventory: {
      title: "การตั้งค่าสินค้าคงคลัง",
      subtitle: "กำหนดค่าการจัดการสินค้าคงคลัง",
      trackInventory: {
        label: "ติดตามสินค้าคงคลัง",
        description: "เปิดใช้งานการติดตามสินค้าคงคลังสำหรับสินค้า",
      },
      lowStockThreshold: {
        label: "เกณฑ์สินค้าคงเหลือต่ำ",
        description: "รับการแจ้งเตือนเมื่อสินค้าคงเหลือต่ำกว่าจำนวนนี้",
      },
      outOfStockBehavior: {
        label: "พฤติกรรมเมื่อสินค้าหมด",
        description: "วิธีจัดการสินค้าเมื่อหมด",
        options: {
          hide: "ซ่อนสินค้า",
          show: "แสดงว่าสินค้าหมด",
          backorder: "อนุญาตให้สั่งซื้อล่วงหน้า",
        },
      },
    },
    tax: {
      title: "การตั้งค่าภาษี",
      subtitle: "กำหนดค่าการคำนวณภาษี",
      taxCalculation: {
        label: "การคำนวณภาษี",
        description: "วิธีการคำนวณภาษีสำหรับคำสั่งซื้อ",
        options: {
          lineItems: "คำนวณต่อรายการ",
          total: "คำนวณจากยอดรวม",
        },
      },
      taxInclusive: {
        label: "แสดงราคารวมภาษี",
        description: "แสดงราคาที่รวมภาษีแล้ว",
      },
      defaultTaxRate: {
        label: "อัตราภาษีเริ่มต้น (%)",
        description: "อัตราภาษีเริ่มต้นที่จะใช้เมื่อไม่ได้กำหนดอัตราเฉพาะ",
      },
    },
    shipping: {
      title: "การตั้งค่าการจัดส่ง",
      subtitle: "กำหนดค่าวิธีการจัดส่งและอัตราค่าจัดส่ง",
      comingSoon: "การตั้งค่าการจัดส่งจะพร้อมใช้งานเร็วๆ นี้",
    },
  },
};

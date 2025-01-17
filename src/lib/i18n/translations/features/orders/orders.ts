export const ordersTranslations = {
  en: {
    title: 'Orders',
    description: "Manage your store's orders",
    actions: {
      create: 'Create order',
      new: 'New order',
      save: 'Save changes',
      cancel: 'Cancel',
      print: 'Print invoice',
      saveOrder: 'Save order',
    },
    list: {
      empty: {
        title: 'No orders found',
        description: 'Get started by creating your first order',
      },
      search: 'Search orders...',
      columns: {
        order: 'Order',
        products: 'Products',
        customer: 'Customer',
        status: 'Status',
        items: 'Items',
        total: 'Total',
      },
      noCustomer: 'No customer',
      itemCount: {
        singular: 'item',
        plural: 'items',
      },
    },
    status: {
      all: 'All',
      cancelled: 'Cancelled',
      pending: 'Pending',
      delivered: 'Delivered',
      shipped: 'Shipped',
      processing: 'Processing',
    },
    customer: {
      title: 'Customer',
      select: {
        title: 'Select customer',
        placeholder: 'Search customers...',
        empty: 'No customers found',
        create: 'Create New Customer',
      },
      new: {
        title: 'New Customer',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone',
      },
    },
    address: {
      select: {
        title: 'Select shipping address',
        placeholder: 'Select shipping address',
        empty: 'No addresses found',
        default: 'Default shipping',
      },
    },
    product: {
      select: {
        title: 'Select products',
        placeholder: 'Search products...',
        empty: 'No products found',
        quantity: 'Quantity',
        additional: 'Additional Products',
        loading: 'Loading products...',
      },
      variant: {
        title: 'Select variant',
        select: 'variants',
        inStock: 'in stock',
      },
    },
    coupon: {
      title: 'Apply Coupon',
      placeholder: 'Enter coupon code',
      apply: 'Apply',
      empty: 'No coupons found',
      invalid: 'Invalid coupon code',
    },
    payment: {
      status: {
        title: 'Payment Status',
        paid: 'Paid',
        pending: 'Pending',
        failed: 'Failed',
      },
    },
    invoice: {
      title: 'Invoice Preview',
      print: 'Print',
      header: {
        invoice: 'INVOICE',
        date: 'Date',
      },
      customer: {
        billTo: 'Bill To',
        shipTo: 'Ship To',
      },
      table: {
        item: 'Item',
        quantity: 'Quantity',
        price: 'Price',
        total: 'Total',
      },
      summary: {
        subtotal: 'Subtotal',
        discount: 'Discount',
        shipping: 'Shipping',
        tax: 'Tax',
        total: 'Total',
      },
      notes: 'Notes',
      footer: 'Thank you for your business!',
    },
    form: {
      title: {
        create: 'Create order',
        edit: 'Edit order #{id}',
      },
      description: {
        create: 'Create a new order for your store',
        edit: '{date} • {daysAgo}',
      },
      tabs: {
        overview: 'Overview',
        basicDetails: 'Basic Details',
        notes: 'Notes',
      },
      months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      daysAgo: {
        today: 'today',
        yesterday: 'yesterday',
        other: '{days} days ago',
      },
    },
    notes: {
      placeholder: 'Add any notes about this order...',
    },
  },
  th: {
    title: 'คำสั่งซื้อ',
    description: 'จัดการคำสั่งซื้อของร้านค้าของคุณ',
    actions: {
      create: 'สร้างคำสั่งซื้อ',
      new: 'คำสั่งซื้อใหม่',
      save: 'บันทึกการเปลี่ยนแปลง',
      cancel: 'ยกเลิก',
      print: 'พิมพ์ใบกำกับภาษี',
      saveOrder: 'บันทึกคำสั่งซื้อ',
    },
    list: {
      empty: {
        title: 'ไม่พบคำสั่งซื้อ',
        description: 'เริ่มต้นด้วยการสร้างคำสั่งซื้อแรกของคุณ',
      },
      search: 'ค้นหาคำสั่งซื้อ...',
      columns: {
        order: 'คำสั่งซื้อ',
        products: 'สินค้า',
        customer: 'ลูกค้า',
        status: 'สถานะ',
        items: 'รายการ',
        total: 'ยอดรวม',
      },
      noCustomer: 'ไม่มีลูกค้า',
      itemCount: {
        singular: 'รายการ',
        plural: 'รายการ',
      },
    },
    status: {
      all: 'ทั้งหมด',
      cancelled: 'ยกเลิก',
      pending: 'รอดำเนินการ',
      delivered: 'จัดส่งแล้ว',
      shipped: 'กำลังจัดส่ง',
      processing: 'กำลังดำเนินการ',
    },
    customer: {
      title: 'ลูกค้า',
      select: {
        title: 'เลือกลูกค้า',
        placeholder: 'ค้นหาลูกค้า...',
        empty: 'ไม่พบลูกค้า',
        create: 'สร้างลูกค้าใหม่',
      },
      new: {
        title: 'ลูกค้าใหม่',
        firstName: 'ชื่อ',
        lastName: 'นามสกุล',
        email: 'อีเมล',
        phone: 'เบอร์โทรศัพท์',
      },
    },
    address: {
      select: {
        title: 'เลือกที่อยู่จัดส่ง',
        placeholder: 'เลือกที่อยู่จัดส่ง',
        empty: 'ไม่พบที่อยู่',
        default: 'ที่อยู่จัดส่งหลัก',
      },
    },
    product: {
      select: {
        title: 'เลือกสินค้า',
        placeholder: 'ค้นหาสินค้า...',
        empty: 'ไม่พบสินค้า',
        quantity: 'จำนวน',
        additional: 'สินค้าเพิ่มเติม',
        loading: 'กำลังโหลดสินค้า...',
      },
      variant: {
        title: 'เลือกตัวเลือก',
        select: 'ตัวเลือก',
        inStock: 'ในสต็อก',
      },
    },
    coupon: {
      title: 'ใช้คูปอง',
      placeholder: 'ใส่รหัสคูปอง',
      apply: 'ใช้คูปอง',
      empty: 'ไม่พบคูปอง',
      invalid: 'รหัสคูปองไม่ถูกต้อง',
    },
    payment: {
      status: {
        title: 'สถานะการชำระเงิน',
        paid: 'ชำระแล้ว',
        pending: 'รอชำระ',
        failed: 'ชำระไม่สำเร็จ',
      },
    },
    invoice: {
      title: 'ดูตัวอย่างใบกำกับภาษี',
      print: 'พิมพ์',
      header: {
        invoice: 'ใบกำกับภาษี',
        date: 'วันที่',
      },
      customer: {
        billTo: 'ที่อยู่เรียกเก็บเงิน',
        shipTo: 'ที่อยู่จัดส่ง',
      },
      table: {
        item: 'รายการ',
        quantity: 'จำนวน',
        price: 'ราคา',
        total: 'รวม',
      },
      summary: {
        subtotal: 'ยอดรวม',
        discount: 'ส่วนลด',
        shipping: 'ค่าจัดส่ง',
        tax: 'ภาษี',
        total: 'ยอดสุทธิ',
      },
      notes: 'หมายเหตุ',
      footer: 'ขอบคุณที่ใช้บริการ',
    },
    form: {
      title: {
        create: 'สร้างคำสั่งซื้อ',
        edit: 'แก้ไขคำสั่งซื้อ #{id}',
      },
      description: {
        create: 'สร้างคำสั่งซื้อใหม่สำหรับร้านค้าของคุณ',
        edit: '{date} • {daysAgo}',
      },
      tabs: {
        overview: 'ภาพรวม',
        basicDetails: 'รายละเอียดพื้นฐาน',
        notes: 'บันทึก',
      },
      months: [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
      ],
      daysAgo: {
        today: 'วันนี้',
        yesterday: 'เมื่อวาน',
        other: '{days} วันที่แล้ว',
      },
    },
    notes: {
      placeholder: 'เพิ่มบันทึกเกี่ยวกับคำสั่งซื้อนี้...',
    },
  },
}; 
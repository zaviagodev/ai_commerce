export const event = {
  en: {
    list: {
      title: "Event & Ticket",
      description: "Manage your events and tickets",
      actions: {
        addEvent: "Add Event",
        addProduct: "Add product",
      },
      eventOrders: {
        title: "Event Orders",
        description: "View and manage orders containing event products",
        actions: {
          addEventOrder: "Add Event Order",
        },
      },
      table: {
        headers: {
          product: "Event",
          status: "Status",
          category: "Category",
          price: "Price",
          quantity: "Quantity",
        },
        empty: {
          title: "No products found",
          description: "Get started by adding your first product",
        },
        cells: {
          sku: "SKU: {value}",
          uncategorized: "Uncategorized",
          inStock: "{count} in stock",
          notTracked: "Not tracked",
        },
        status: {
          active: "active",
          archived: "archived",
          draft: "draft",
        },
      },
    },
    eventDetails: {
      title: "Event Details",
      subtitle: "Configure event specific information",
      startDateTime: "Start Date & Time",
      endDateTime: "End Date & Time",
      attendancePoints: {
        label: "Attendance Points",
        placeholder: "Enter points value",
        description: "Points awarded to attendees for attending this event",
      },
      venueName: {
        label: "Venue Name",
        placeholder: "e.g., Convention Center",
      },
      venueAddress: {
        label: "Venue Address",
        placeholder: "Enter the complete venue address",
        description: "Provide detailed location information for attendees",
      },
      googleMapsLink: {
        label: "Google Maps Link",
        placeholder: "Paste Google Maps link here",
        description: "Add a Google Maps link to help attendees find the venue",
      },
      organizerName: {
        label: "Organizer Name",
        placeholder: "Event organizer",
      },
      organizerContact: {
        label: "Organizer Contact",
        placeholder: "Contact information",
      },
    },
    ticketList: {
      title: "Event & Ticket",
      description: "Manage your events and tickets",
      actions: {
        addEvent: "Add Event",
      },
      table: {
        headers: {
          product: "Event",
          status: "Status",
          category: "Category",
          price: "Price",
          quantity: "Quantity",
        },
        empty: {
          title: "No events found",
          description: "Get started by adding your first event",
        },
        cells: {
          sku: "SKU: {value}",
          uncategorized: "Uncategorized",
          inStock: "{count} in stock",
          notTracked: "Not tracked",
        },
        status: {
          active: "active",
          archived: "archived",
          draft: "draft",
        },
      },
      search: "Search events...",
    },
  },
  th: {
    list: {
      title: "อีเวนต์และตั๋ว",
      description: "จัดการอีเวนต์และตั๋วของคุณ",
      actions: {
        addEvent: "เพิ่มอีเวนต์",
        addProduct: "เพิ่มสินค้า",
      },
      eventOrders: {
        title: "คำสั่งซื้ออีเวนต์",
        description: "ดูและจัดการคำสั่งซื้ออีเวนต์",
        actions: {
          addEventOrder: "เพิ่มคำสั่งซื้ออีเวนต์",
        },
      },
      table: {
        headers: {
          product: "อีเวนต์",
          status: "สถานะ",
          category: "หมวดหมู่",
          price: "ราคา",
          quantity: "จำนวน",
        },
        empty: {
          title: "ไม่พบสินค้า",
          description: "เริ่มต้นด้วยการเพิ่มสินค้าแรกของคุณ",
        },
        cells: {
          sku: "รหัสสินค้า: {value}",
          uncategorized: "ไม่มีหมวดหมู่",
          inStock: "มีสินค้า {count} ชิ้น",
          notTracked: "ไม่ได้ติดตาม",
        },
        status: {
          active: "ใช้งาน",
          archived: "เก็บถาวร",
          draft: "ฉบับร่าง",
        },
      },
    },
    eventDetails: {
      title: "รายละเอียดอีเวนต์",
      subtitle: "กำหนดค่าข้อมูลเฉพาะของอีเวนต์",
      startDateTime: "วันและเวลาเริ่ม",
      endDateTime: "วันและเวลาสิ้นสุด",
      attendancePoints: {
        label: "จำนวนคะแนนการเข้าร่วม",
        placeholder: "กรอกค่าคะแนน",
        description: "คะแนนที่จะถือได้จากการเข้าร่วมอีเวนต์",
      },
      venueName: {
        label: "ชื่อสถานที่จัดงาน",
        placeholder: "เช่น ศูนย์การประชุม",
      },
      venueAddress: {
        label: "ที่อยู่สถานที่จัดงาน",
        placeholder: "กรอกที่อยู่สถานที่จัดงานให้ครบถ้วน",
        description: "ให้ข้อมูลสถานที่จัดงานอย่างละเอียดแก่ผู้เข้าร่วม",
      },
      googleMapsLink: {
        label: "ลิงก์ Google Maps",
        placeholder: "วางลิงก์ Google Maps ที่นี่",
        description:
          "เพิ่มลิงก์ Google Maps เพื่อช่วยให้ผู้เข้าร่วมค้นหาสถานที่จัดงานได้",
      },
      organizerName: {
        label: "ชื่อผู้จัดงาน",
        placeholder: "ผู้จัดงานอีเวนต์",
      },
      organizerContact: {
        label: "การติดต่อผู้จัดงาน",
        placeholder: "ข้อมูลติดต่อ",
      },
    },
    ticketList: {
      title: "อีเวนต์และตั๋ว",
      description: "จัดการอีเวนต์และตั๋วของคุณ",
      actions: {
        addEvent: "เพิ่มอีเวนต์",
      },
      table: {
        headers: {
          product: "อีเวนต์",
          status: "สถานะ",
          category: "หมวดหมู่",
          price: "ราคา",
          quantity: "จำนวน",
        },
        empty: {
          title: "ไม่พบอีเวนต์",
          description: "เริ่มต้นด้วยการเพิ่มอีเวนต์แรกของคุณ",
        },
        cells: {
          sku: "รหัสอีเวนต์: {value}",
          uncategorized: "ไม่มีหมวดหมู่",
          inStock: "มีตั๋ว {count} ใบ",
          notTracked: "ไม่ได้ติดตาม",
        },
        status: {
          active: "ใช้งาน",
          archived: "เก็บถาวร",
          draft: "ฉบับร่าง",
        },
      },
      search: "ค้นหาอีเวนต์...",
    },
  },
};

export const pointsTranslations = {
  en: {
    rewards: {
      title: 'Rewards Items',
      description: "Manage your store's redeemable reward items",
      actions: {
        create: 'Add reward item',
        edit: 'Edit reward item',
        save: 'Save changes',
        cancel: 'Cancel',
        print: 'Print Receipt',
        delete: 'Delete reward item',
      },
      list: {
        empty: {
          title: 'No reward items found',
          description: 'Get started by adding your first reward item',
        },
        search: 'Search rewards items...',
        columns: {
          product: 'Product',
          status: 'Status',
          category: 'Category',
          pointsRequired: 'Points Required',
          quantity: 'Quantity',
        },
        inStock: 'in stock',
        notTracked: 'Not tracked',
      },
      form: {
        title: {
          create: 'Create reward item',
          edit: 'Edit reward item #{id}',
        },
        description: {
          create: 'Add a new reward item to your store',
          edit: 'Update reward item information',
        },
        messages: {
          confirmCancel: 'Are you sure? Any unsaved changes will be lost.',
          createSuccess: 'Reward item created successfully',
          updateSuccess: 'Reward item updated successfully',
          deleteSuccess: 'Reward item deleted successfully',
          error: 'An error occurred while processing your request',
        },
      },
    },
    redeems: {
      title: 'Redemptions',
      description: "Manage your store's reward redemptions",
      actions: {
        create: 'Add redemption',
        edit: 'Edit redemption',
        save: 'Save changes',
        cancel: 'Cancel',
        print: 'Print Receipt',
        delete: 'Delete redemption',
      },
      list: {
        empty: {
          title: 'No redemptions found',
          description: 'Redemption history will appear here',
        },
        search: 'Search redemptions...',
        columns: {
          id: 'Redemption ID',
          customer: 'Customer',
          item: 'Reward Item',
          points: 'Points Used',
          status: 'Status',
          date: 'Date',
        },
      },
      form: {
        title: {
          create: 'Create redemption',
          edit: 'Edit redemption #{id}',
        },
        description: {
          create: 'Record a new reward redemption',
          edit: 'Update redemption information',
        },
        messages: {
          confirmCancel: 'Are you sure? Any unsaved changes will be lost.',
          createSuccess: 'Redemption created successfully',
          updateSuccess: 'Redemption updated successfully',
          deleteSuccess: 'Redemption deleted successfully',
          error: 'An error occurred while processing your request',
        },
        tabs: {
          overview: 'Overview',
          basicDetails: 'Basic Details',
        },
      },
      status: {
        pending: 'Pending',
        completed: 'Completed',
        cancelled: 'Cancelled',
      },
    },
  },
  th: {
    rewards: {
      title: 'รายการรางวัล',
      description: 'จัดการรายการรางวัลที่สามารถแลกได้',
      actions: {
        create: 'เพิ่มรายการรางวัล',
        edit: 'แก้ไขรายการรางวัล',
        save: 'บันทึกการเปลี่ยนแปลง',
        cancel: 'ยกเลิก',
        print: 'พิมพ์ใบเสร็จ',
        delete: 'ลบรายการรางวัล',
      },
      list: {
        empty: {
          title: 'ไม่พบรายการรางวัล',
          description: 'เริ่มต้นด้วยการเพิ่มรายการรางวัลแรกของคุณ',
        },
        search: 'ค้นหารายการรางวัล...',
        columns: {
          product: 'สินค้า',
          status: 'สถานะ',
          category: 'หมวดหมู่',
          pointsRequired: 'คะแนนที่ต้องใช้',
          quantity: 'จำนวน',
        },
        inStock: 'ในสต็อก',
        notTracked: 'ไม่ได้ติดตาม',
      },
      form: {
        title: {
          create: 'สร้างรายการรางวัล',
          edit: 'แก้ไขรายการรางวัล #{id}',
        },
        description: {
          create: 'เพิ่มรายการรางวัลใหม่ในร้านค้าของคุณ',
          edit: 'อัปเดตข้อมูลรายการรางวัล',
        },
        messages: {
          confirmCancel: 'คุณแน่ใจหรือไม่? การเปลี่ยนแปลงที่ยังไม่ได้บันทึกจะหายไป',
          createSuccess: 'สร้างรายการรางวัลสำเร็จ',
          updateSuccess: 'อัปเดตรายการรางวัลสำเร็จ',
          deleteSuccess: 'ลบรายการรางวัลสำเร็จ',
          error: 'เกิดข้อผิดพลาดในการดำเนินการ',
        },
      },
    },
    redeems: {
      title: 'การแลกรางวัล',
      description: 'จัดการการแลกรางวัลในร้านค้าของคุณ',
      actions: {
        create: 'เพิ่มการแลกรางวัล',
        edit: 'แก้ไขการแลกรางวัล',
        save: 'บันทึกการเปลี่ยนแปลง',
        cancel: 'ยกเลิก',
        print: 'พิมพ์ใบเสร็จ',
        delete: 'ลบการแลกรางวัล',
      },
      list: {
        empty: {
          title: 'ไม่พบการแลกรางวัล',
          description: 'ประวัติการแลกรางวัลจะแสดงที่นี่',
        },
        search: 'ค้นหาการแลกรางวัล...',
        columns: {
          id: 'รหัสการแลก',
          customer: 'ลูกค้า',
          item: 'รายการรางวัล',
          points: 'คะแนนที่ใช้',
          status: 'สถานะ',
          date: 'วันที่',
        },
      },
      form: {
        title: {
          create: 'สร้างการแลกรางวัล',
          edit: 'แก้ไขการแลกรางวัล #{id}',
        },
        description: {
          create: 'บันทึกการแลกรางวัลใหม่',
          edit: 'อัปเดตข้อมูลการแลกรางวัล',
        },
        messages: {
          confirmCancel: 'คุณแน่ใจหรือไม่? การเปลี่ยนแปลงที่ยังไม่ได้บันทึกจะหายไป',
          createSuccess: 'สร้างการแลกรางวัลสำเร็จ',
          updateSuccess: 'อัปเดตการแลกรางวัลสำเร็จ',
          deleteSuccess: 'ลบการแลกรางวัลสำเร็จ',
          error: 'เกิดข้อผิดพลาดในการดำเนินการ',
        },
        tabs: {
          overview: 'ภาพรวม',
          basicDetails: 'รายละเอียดพื้นฐาน',
        },
      },
      status: {
        pending: 'รอดำเนินการ',
        completed: 'เสร็จสิ้น',
        cancelled: 'ยกเลิก',
      },
    },
  },
}; 
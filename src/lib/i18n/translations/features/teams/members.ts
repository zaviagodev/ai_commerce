export const members = {
  en: {
    title: 'Team Members',
    subtitle: 'Manage your team members and their roles',
    addMember: 'Invite member',
    noMembers: {
      title: 'No team members found',
      subtitle: 'Start by inviting your first team member',
    },
    roles: {
      owner: 'Owner',
      admin: 'Admin',
      manager: 'Manager',
      staff: 'Staff',
    },
    status: {
      active: 'Active',
      pending: 'Pending',
      inactive: 'Inactive',
    },
    table: {
      member: 'Member',
      role: 'Role',
      status: 'Status',
      lastActive: 'Last active',
      actions: 'Actions',
    },
    actions: {
      sendReminder: 'Send reminder',
      changeRole: 'Change role',
      removeMember: 'Remove member',
      cancel: 'Cancel',
    },
    remove: {
      description: "This action cannot be undone",
      warning: 'Are you sure you want to remove {name}? This will:',
      consequences: [
        'Revoke all access permissions',
        'Remove them from all teams and projects',
        'Delete their account settings'
      ],
      cancel: 'Cancel',
      confirm: 'Remove Member'
    },
    timeAgo: {
      justNow: 'Just now',
      minute: '{{count}} minute ago',
      minutes: '{{count}} minutes ago',
      hour: '{{count}} hour ago',
      hours: '{{count}} hours ago',
      day: '{{count}} day ago',
      days: '{{count}} days ago',
      month: '{{count}} month ago',
      months: '{{count}} months ago',
      year: '{{count}} year ago',
      years: '{{count}} years ago',
    },
    createdBy: "Created by",
    lastUpdated: "Last updated",
    basicInfo: {
      title: "Basic Information",
      subtitle: "Member profile and contact details",
      firstName: {
        label: "First Name",
        placeholder: "Enter first name"
      },
      lastName: {
        label: "Last Name",
        placeholder: "Enter last name"
      },
      email: {
        label: "Email",
        placeholder: "Enter email address"
      },
      phoneNumber: {
        label: "Phone Number",
        description: "Contact support to update phone number"
      },
      lineID: {
        label: "Line ID",
        description: "Contact support to update Line ID"
      },
      memberSince: "Member Since",
      dateFormat: "en-US"
    },
    rolePermissions: {
      title: "Role & Permissions",
      subtitle: "Configure member role and access permissions",
      roleAssignment: {
        label: "Role Assignment",
        owner: {
          title: "Owner",
          subtitle: "Full access with ownership rights"
        },
        admin: {
          title: "Admin",
          subtitle: "Full access to all features"
        },
        staff: {
          title: "Staff",
          subtitle: "Limited access to features"
        }
      },
      permissionGroups: {
        label: "Permission Groups",
        products: {
          title: "Products",
          subtitle: "Manage products and inventory"
        },
        orders: {
          title: "Orders",
          subtitle: "Manage orders and fulfillment"
        },
        customers: {
          title: "Customers",
          subtitle: "Manage customer data and groups"
        },
        coupons: {
          title: "Coupons",
          subtitle: "Manage discounts and promotions"
        },
        events: {
          title: "Events & Tickets",
          subtitle: "Manage events and ticket sales"
        },
        points: {
          title: "Points & Rewards",
          subtitle: "Manage loyalty program and rewards"
        }
      }
    }
  },
  th: {
    title: 'สมาชิกทีม',
    subtitle: 'จัดการสมาชิกทีมและบทบาทของพวกเขา',
    addMember: 'เชิญสมาชิก',
    noMembers: {
      title: 'ไม่พบสมาชิกทีม',
      subtitle: 'เริ่มต้นด้วยการเชิญสมาชิกทีมคนแรกของคุณ',
    },
    roles: {
      owner: 'เจ้าของ',
      admin: 'ผู้ดูแลระบบ',
      manager: 'ผู้จัดการ',
      staff: 'พนักงาน',
    },
    status: {
      active: 'ใช้งาน',
      pending: 'รอดำเนินการ',
      inactive: 'ไม่ใช้งาน',
    },
    table: {
      member: 'สมาชิก',
      role: 'บทบาท',
      status: 'สถานะ',
      lastActive: 'ใช้งานล่าสุด',
      actions: 'การดำเนินการ',
    },
    actions: {
      sendReminder: 'ส่งการแจ้งเตือน',
      changeRole: 'เปลี่ยนบทบาท',
      removeMember: 'ลบสมาชิก',
      cancel: 'ยกเลิก',
    },
    remove: {
      title: 'ลบสมาชิก',
      description: 'การกระทำนี้ไม่สามารถยกเลิกได้',
      warning: 'คุณแน่ใจหรือไม่ที่จะลบ {name}? การดำเนินการนี้จะ:',
      consequences: [
        'เพิกถอนสิทธิ์การเข้าถึงทั้งหมด',
        'นำออกจากทีมและโปรเจกต์ทั้งหมด',
        'ลบการตั้งค่าบัญชี'
      ],
      cancel: 'ยกเลิก',
      confirm: 'ลบสมาชิก'
    },
    timeAgo: {
      justNow: 'เมื่อสักครู่',
      minute: '{{count}} นาทีที่แล้ว',
      minutes: '{{count}} นาทีที่แล้ว',
      hour: '{{count}} ชั่วโมงที่แล้ว',
      hours: '{{count}} ชั่วโมงที่แล้ว',
      day: '{{count}} วันที่แล้ว',
      days: '{{count}} วันที่แล้ว',
      month: '{{count}} เดือนที่แล้ว',
      months: '{{count}} เดือนที่แล้ว',
      year: '{{count}} ปีที่แล้ว',
      years: '{{count}} ปีที่แล้ว',
    },
    createdBy: "สร้างโดย",
    lastUpdated: "อัปเดตล่าสุด",
    basicInfo: {
      title: "ข้อมูลพื้นฐาน",
      subtitle: "ข้อมูลติดต่อและโปรไฟล์สมาชิก",
      firstName: {
        label: "ชื่อ",
        placeholder: "ใส่ชื่อ"
      },
      lastName: {
        label: "นามสกุล",
        placeholder: "ใส่นามสกุล"
      },
      email: {
        label: "อีเมล",
        placeholder: "ใส่ที่อยู่อีเมล"
      },
      phoneNumber: {
        label: "เบอร์โทรศัพท์",
        description: "ติดต่อฝ่ายช่วยเหลือเพื่ออัปเดตเบอร์โทรศัพท์"
      },
      lineID: {
        label: "ไลน์ไอดี",
        description: "ติดต่อฝ่ายช่วยเหลือเพื่ออัปเดตไลน์ไอดี"
      },
      memberSince: "เป็นสมาชิกตั้งแต่",
      dateFormat: "th-TH"
    },
    rolePermissions: {
      title: "บทบาทและการอนุญาต",
      subtitle: "กำหนดค่าบทบาทสมาชิกและการอนุญาตเข้าถึง",
      roleAssignment: {
        label: "การมอบหมายบทบาท",
        owner: {
          title: "เจ้าของ",
          subtitle: "เข้าถึงได้เต็มรูปแบบพร้อมสิทธิ์ความเป็นเจ้าของ"
        },
        admin: {
          title: "ผู้ดูแล",
          subtitle: "เข้าถึงฟีเจอร์ทั้งหมดได้เต็มที่"
        },
        staff: {
          title: "พนักงาน",
          subtitle: "จำกัดการเข้าถึงฟีเจอร์"
        }
      },
      permissionGroups: {
        label: "กลุ่มการอนุญาต",
        products: {
          title: "สินค้า",
          subtitle: "จัดการสินค้าและสินค้าคงคลัง"
        },
        orders: {
          title: "คำสั่งซื้อ",
          subtitle: "จัดการคำสั่งซื้อและการปฏิบัติตาม"
        },
        customers: {
          title: "ลูกค้า",
          subtitle: "จัดการข้อมูลลูกค้าและกลุ่มลูกค้า"
        },
        coupons: {
          title: "คูปอง",
          subtitle: "จัดการส่วนลดและโปรโมชัน"
        },
        events: {
          title: "อีเวนต์และตั๋ว",
          subtitle: "จัดการอีเวนต์และรายการขายตั๋ว"
        },
        points: {
          title: "คะแนนและรางวัล",
          subtitle: "จัดการโปรแกรมความภักดีและรางวัล"
        }
      }
    }
  },
};

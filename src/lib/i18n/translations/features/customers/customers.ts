export const customersTranslations = {
  en: {
    title: 'Customers',
    description: "Manage your store's customers",
    actions: {
      create: 'Add customer',
      new: 'New customer',
      save: 'Save changes',
      delete: 'Delete customer',
    },
    list: {
      empty: {
        title: 'No customers found',
        description: 'Get started by adding your first customer',
      },
      columns: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        tags: 'Tags',
        orders: 'Orders',
      },
      orders: 'orders',
      search: 'Search customers...'
    },
    form: {
      title: {
        create: 'Create customer',
        edit: 'Edit customer',
      },
      description: {
        create: 'Add a new customer to your store',
        edit: 'Update customer information',
      },
      sections: {
        basicDetails: {
          title: 'Basic Details',
          description: 'Add the essential information about your customer',
        },
        addresses: {
          title: 'Addresses',
          description: 'Manage customer shipping and billing addresses',
          default: 'Default',
          actions: {
            add: 'Add address',
            edit: 'Edit address',
            delete: 'Delete address',
            save: 'Save address',
            cancel: 'Cancel',
          },
          fields: {
            type: {
              label: 'Address Type',
              shipping: 'Shipping',
              billing: 'Billing',
              placeholder: 'Select type',
            },
            firstName: {
              label: 'First Name',
              placeholder: 'John',
            },
            lastName: {
              label: 'Last Name',
              placeholder: 'Doe',
            },
            company: {
              label: 'Company (optional)',
              placeholder: 'Company',
            },
            address1: {
              label: 'Address Line 1',
              placeholder: 'Street address',
            },
            address2: {
              label: 'Address Line 2',
              placeholder: 'Apartment, suite, etc. (optional)',
            },
            city: {
              label: 'City',
              placeholder: 'City',
            },
            state: {
              label: 'State/Province',
              placeholder: 'State/Province',
            },
            postalCode: {
              label: 'Postal Code',
              placeholder: 'Postal code',
            },
            country: {
              label: 'Country',
              placeholder: 'Select country',
            },
            phone: {
              label: 'Phone',
              placeholder: 'Phone number (optional)',
            },
            isDefault: {
              label: 'Set as default address',
              description: 'Use this as the default address for this type',
            },
          },
        },
        marketing: {
          title: 'Marketing',
          description: 'Configure marketing preferences and tags',
          fields: {
            acceptsMarketing: {
              label: 'Email marketing',
              description: 'Customer will receive marketing emails',
            },
            tags: {
              label: 'Tags',
              placeholder: 'Press enter to add tags',
            },
          },
        },
        metrics: {
          lastLogin: {
            title: 'Last Login',
            value: '2 hours ago',
          },
          totalOrders: {
            title: 'Total Orders',
            subtitle: '+12.5% from last month',
          },
          itemsPurchased: {
            title: 'Items Purchased',
            value: '142 items',
          },
          recentPurchases: {
            title: 'Recent Purchases',
            items: {
              smartWatch: 'Smart Watch Pro',
              headphones: 'Wireless Headphones',
              cameraLens: 'Camera Lens',
              gamingConsole: 'Gaming Console',
            },
            dates: {
              today: 'Today at 2:34 PM',
              yesterday: 'Yesterday at 11:20 AM',
              dec18: 'Dec 18, 2023',
              dec15: 'Dec 15, 2023',
            },
          },
          totalSpending: {
            title: 'Total Spending',
            subtitle: '+8.2% from last month',
          },
          averageOrder: {
            title: 'Average Order Value',
            subtitle: '↑ Trending up',
          },
        },
      },
      fields: {
        firstName: {
          label: 'First Name',
          placeholder: 'John',
        },
        lastName: {
          label: 'Last Name',
          placeholder: 'Doe',
        },
        company: {
          label: 'Company (optional)',
          placeholder: 'Company',
        },
        email: {
          label: 'Email',
          placeholder: 'john@example.com',
          checking: 'Checking email availability...',
          errors: {
            inUse: 'This email is already in use',
          },
        },
        phone: {
          label: 'Phone',
          placeholder: '+1234567890',
        },
        tags: {
          label: 'Tags',
          placeholder: 'Press enter to add tags',
        },
        verified: {
          label: 'Verified Customer',
          description: 'Mark this customer as verified with a checkmark badge',
        },
      },
      errors: {
        notFound: 'Customer not found',
      },
    },
    group: {
      title: {
        create: 'Create group',
        edit: 'Edit group',
      },
      description: {
        create: 'Create a new customer group',
        edit: 'Update group details',
      },
      actions: {
        save: 'Save group',
        discard: 'Discard',
      },
      sections: {
        basicDetails: {
          title: 'Basic Details',
          description: 'Configure the group\'s basic information',
          fields: {
            name: {
              label: 'Group Name',
              placeholder: 'Enter group name',
              description: "Choose a descriptive name for this customer group"
            },
            description: {
              label: 'Description',
              placeholder: 'Enter group description',
              description: "Explain how this group will be used"
            },
            color: {
              label: 'Group Color',
              description: 'Choose a color for the group badge',
            },
            status: {
              label: 'Status',
              active: 'Active',
              inactive: 'Inactive',
              description: "Control whether this group is currently active"
            },
          },
        },
        members: {
          title: 'Members',
          description: 'Add or remove customers from this group',
          actions: {
            add: 'Add members',
            remove: 'Remove',
          },
          empty: {
            title: 'No members',
            description: 'This group has no members yet',
          },
          search: {
            placeholder: 'Search customers...',
          },
        },
        automation: {
          title: 'Automation',
          description: 'Set up automatic group assignment rules',
          fields: {
            autoAssign: {
              label: 'Auto-assign Members',
              description: 'Automatically add customers to this group when they match the conditions',
            },
            conditions: {
              label: 'Conditions',
              description: 'Add conditions for automatic group assignment',
              add: 'Add condition',
              empty: 'No conditions added',
              field: {
                label: 'Field',
                placeholder: 'Select field',
              },
              operator: {
                label: 'Operator',
                placeholder: 'Select operator',
              },
              value: {
                label: 'Value',
                placeholder: 'Enter value',
              },
            },
          },
        },
      },
      list: {
        title: 'Customer Groups',
        description: 'Organize customers into manageable groups',
        actions: {
          create: 'Create group',
          edit: 'Edit',
          delete: 'Delete',
        },
        columns: {
          name: 'Group Name',
          members: 'Members',
          autoAssign: 'Auto-assign',
          status: 'Status',
          actions: 'Actions',
        },
        empty: {
          title: 'No groups found',
          description: 'Get started by creating your first customer group',
        },
        memberCount: '{count} member{s}',
        autoAssign: {
          enabled: 'Enabled',
          disabled: 'Disabled',
        },
        status: {
          active: 'Active',
          inactive: 'Inactive',
        },
        search: "Search customer groups..."
      },
      errors: {
        notFound: 'Group not found',
      },
    },
    tier: {
      title: {
        create: 'Create tier',
        edit: 'Edit tier',
      },
      description: {
        create: 'Create a new customer loyalty tier',
        edit: 'Update tier details',
      },
      actions: {
        save: 'Save tier',
        discard: 'Discard',
      },
      sections: {
        basicDetails: {
          title: 'Basic Details',
          description: 'Configure the tier\'s basic information',
          fields: {
            name: {
              label: 'Tier Name',
              placeholder: 'Enter tier name',
            },
            description: {
              label: 'Description',
              placeholder: 'Enter tier description',
            },
            color: {
              label: 'Tier Color',
              description: 'Choose a color for the tier badge',
            },
            status: {
              label: 'Status',
              active: 'Active',
              inactive: 'Inactive',
            },
          },
        },
        requirements: {
          title: 'Requirements',
          description: 'Set the criteria for customers to reach this tier',
          fields: {
            spendingAmount: {
              label: 'Spending Amount',
              description: 'Minimum amount customers need to spend',
              placeholder: 'Enter amount',
            },
            orderCount: {
              label: 'Order Count',
              description: 'Minimum number of orders required',
              placeholder: 'Enter number of orders',
            },
            timeframe: {
              label: 'Timeframe',
              description: 'Period in which requirements must be met',
              options: {
                lifetime: 'Lifetime',
                yearly: 'Yearly',
                monthly: 'Monthly',
              },
            },
          },
        },
        benefits: {
          title: 'Benefits',
          description: 'Configure the rewards and perks for this tier',
          fields: {
            rewardsMultiplier: {
              label: 'Rewards Multiplier',
              description: 'Points multiplier for purchases',
              placeholder: 'Enter multiplier',
            },
            discountPercentage: {
              label: 'Discount Percentage',
              description: 'Discount applied to all purchases',
              placeholder: 'Enter percentage',
            },
            freeShipping: {
              label: 'Free Shipping',
              description: 'Offer free shipping on all orders',
            },
            prioritySupport: {
              label: 'Priority Support',
              description: 'Provide priority customer support',
            },
            earlyAccess: {
              label: 'Early Access',
              description: 'Early access to new products and sales',
            },
          },
        },
      },
      list: {
        title: 'Customer Tiers',
        description: 'Manage customer loyalty tiers and rewards',
        actions: {
          create: 'Add tier',
        },
        columns: {
          tier: 'Tier',
          rewardsMultiplier: 'Rewards Multiplier',
          discount: 'Discount',
          benefits: 'Benefits',
          status: 'Status',
        },
        empty: {
          title: 'No tiers found',
          description: 'Get started by creating your first customer tier',
        },
        benefits: {
          freeShipping: 'Free Shipping',
          prioritySupport: 'Priority Support',
          earlyAccess: 'Early Access',
        },
        status: {
          active: 'Active',
          inactive: 'Inactive',
        },
        search: "Search customer tiers..."
      },
      errors: {
        notFound: 'Tier not found',
      },
    },
    campaign: {
      title: 'Campaigns',
      description: 'Manage your points and rewards campaigns',
      actions: {
        create: 'Create campaign',
      },
      list: {
        empty: {
          title: 'No campaigns found',
          description: 'Get started by creating your first campaign',
        },
        columns: {
          campaign: 'Campaign',
          type: 'Type',
          duration: 'Duration',
          target: 'Target',
          status: 'Status',
        },
        types: {
          points_multiplier: 'Points Multiplier',
          bonus_points: 'Bonus Points',
        },
        target: {
          all: 'All Customers',
          tier: 'Specific Tiers',
          group: 'Specific Groups',
        },
        status: {
          active: 'Active',
          scheduled: 'Scheduled',
          ended: 'Ended',
        },
        duration: {
          to: 'to',
        },
        search: "Search campaigns..."
      },
    },
    coupon: {
      title: 'Coupon Campaigns',
      description: "Manage your store's coupon campaigns",
      actions: {
        create: 'Create Campaign',
      },
      list: {
        empty: {
          title: 'No coupon campaigns found',
          description: 'Get started by creating your first coupon campaign',
        },
        columns: {
          campaign: 'Campaign',
          discount: 'Discount',
          usage: 'Usage',
          duration: 'Duration',
          status: 'Status',
        },
        discount: {
          percentage: '{value}% off',
          fixed: '${value} off',
          shipping: 'Free Shipping',
          points: '{value}x Points',
        },
        usage: {
          count: '{count} used',
          limit: {
            one: '{count} limit',
            many: '{count} limits',
            unlimited: 'Unlimited',
          },
        },
        duration: {
          to: 'to',
        },
        status: {
          active: 'Active',
          scheduled: 'Scheduled',
          expired: 'Expired',
          draft: 'Draft',
        },
        search: "Search coupon campaigns..."
      },
    },
    campaignForm: {
      sections: {
        basicDetails: {
          title: 'Basic Details',
          description: 'Configure the campaign\'s basic information',
          template: {
            title: 'Campaign Template',
            types: {
              points_multiplier: 'Points Multiplier Campaign',
              bonus_points: 'Bonus Points Campaign',
            },
          },
          fields: {
            name: {
              label: 'Campaign name',
              placeholder: 'e.g., Summer Sale Double Points',
              description: 'Choose a descriptive name for this campaign',
            },
            description: {
              label: 'Description',
              placeholder: 'Describe your campaign...',
              description: 'Provide details about the campaign\'s purpose and benefits',
            },
            startDate: {
              label: 'Start date',
            },
            endDate: {
              label: 'End date',
            },
            status: {
              label: 'Status',
              placeholder: 'Select status',
              options: {
                draft: 'Draft',
                scheduled: 'Scheduled',
                active: 'Active',
              },
            },
            type: {
              label: 'Campaign type',
              placeholder: 'Select type',
              options: {
                points_multiplier: 'Points Multiplier',
                bonus_points: 'Bonus Points',
              },
            },
          },
        },
        pointsConfig: {
          title: 'Points Configuration',
          description: 'Set up how points are earned in this campaign',
          fields: {
            multiplier: {
              label: 'Points Multiplier',
              placeholder: 'Enter multiplier value',
              description: 'How many times the base points should be multiplied',
            },
            bonusPoints: {
              label: 'Bonus Points',
              placeholder: 'Enter bonus points',
              description: 'Fixed amount of bonus points to award',
            },
          },
        },
        conditions: {
          title: 'Conditions',
          description: 'Set conditions for when points are awarded',
          fields: {
            minimumPurchase: {
              label: 'Minimum Purchase Amount',
              placeholder: 'Enter minimum amount',
              description: 'Minimum purchase amount required to earn points',
            },
            maximumPoints: {
              label: 'Maximum Points',
              placeholder: 'Enter maximum points',
              description: 'Maximum points that can be earned per transaction',
            },
          },
        },
        limitations: {
          title: 'Limitations',
          description: 'Set limits on campaign usage',
          fields: {
            usageLimit: {
              label: 'Usage Limit',
              placeholder: 'Enter usage limit',
              description: 'Maximum number of times this campaign can be used',
            },
            userLimit: {
              label: 'Per User Limit',
              placeholder: 'Enter per user limit',
              description: 'Maximum number of times each user can use this campaign',
            },
          },
        },
        displaySettings: {
          title: 'Display Settings',
          description: 'Configure how the campaign appears to customers',
          fields: {
            showProgress: {
              label: 'Show Progress',
              description: 'Display progress towards campaign goals',
            },
            showRemaining: {
              label: 'Show Remaining',
              description: 'Display remaining uses or points available',
            },
          },
        },
        qrCodeConfig: {
          title: 'QR Code Configuration',
          description: 'Set up QR code settings for this campaign',
          fields: {
            enabled: {
              label: 'Enable QR Code',
              description: 'Allow customers to earn points by scanning QR codes',
            },
            points: {
              label: 'Points per Scan',
              placeholder: 'Enter points per scan',
              description: 'Number of points awarded per QR code scan',
            },
            scanLimit: {
              label: 'Scan Limit',
              placeholder: 'Enter scan limit',
              description: 'Maximum number of times each QR code can be scanned',
            },
          },
        },
        clickLinkConfig: {
          title: 'Click Link Configuration',
          description: 'Set up click link settings for this campaign',
          fields: {
            enabled: {
              label: 'Enable Click Link',
              description: 'Allow customers to earn points by clicking links',
            },
            points: {
              label: 'Points per Click',
              placeholder: 'Enter points per click',
              description: 'Number of points awarded per link click',
            },
            clickLimit: {
              label: 'Click Limit',
              placeholder: 'Enter click limit',
              description: 'Maximum number of times each link can be clicked',
            },
          },
        },
      },
    },
  },
  th: {
    title: 'ลูกค้า',
    description: 'จัดการลูกค้าของร้านค้าของคุณ',
    actions: {
      create: 'เพิ่มลูกค้า',
      new: 'ลูกค้าใหม่',
      save: 'บันทึกการเปลี่ยนแปลง',
      delete: 'ลบลูกค้า',
    },
    list: {
      empty: {
        title: 'ไม่พบลูกค้า',
        description: 'เริ่มต้นด้วยการเพิ่มลูกค้าคนแรกของคุณ',
      },
      columns: {
        name: 'ชื่อ',
        email: 'อีเมล',
        phone: 'เบอร์โทรศัพท์',
        tags: 'แท็ก',
        orders: 'คำสั่งซื้อ',
      },
      orders: 'คำสั่งซื้อ',
      search: 'ค้นหาลูกค้า...'
    },
    form: {
      title: {
        create: 'สร้างลูกค้า',
        edit: 'แก้ไขลูกค้า',
      },
      description: {
        create: 'เพิ่มลูกค้าใหม่ให้กับร้านค้าของคุณ',
        edit: 'อัปเดตข้อมูลลูกค้า',
      },
      sections: {
        basicDetails: {
          title: 'ข้อมูลพื้นฐาน',
          description: 'เพิ่มข้อมูลที่จำเป็นเกี่ยวกับลูกค้าของคุณ',
        },
        addresses: {
          title: 'ที่อยู่',
          description: 'จัดการที่อยู่จัดส่งและที่อยู่เรียกเก็บเงินของลูกค้า',
          default: 'ค่าเริ่มต้น',
          actions: {
            add: 'เพิ่มที่อยู่',
            edit: 'แก้ไขที่อยู่',
            delete: 'ลบที่อยู่',
            save: 'บันทึกที่อยู่',
            cancel: 'ยกเลิก',
          },
          fields: {
            type: {
              label: 'ประเภทที่อยู่',
              shipping: 'ที่อยู่จัดส่ง',
              billing: 'ที่อยู่เรียกเก็บเงิน',
              placeholder: 'เลือกประเภท',
            },
            firstName: {
              label: 'ชื่อ',
              placeholder: 'จอห์น',
            },
            lastName: {
              label: 'นามสกุล',
              placeholder: 'โด',
            },
            company: {
              label: 'บริษัท (ไม่บังคับ)',
              placeholder: 'บริษัท',
            },
            address1: {
              label: 'ที่อยู่บรรทัดที่ 1',
              placeholder: 'ที่อยู่ถนน',
            },
            address2: {
              label: 'ที่อยู่บรรทัดที่ 2',
              placeholder: 'อพาร์ทเมนต์, ห้องชุด, ฯลฯ (ไม่บังคับ)',
            },
            city: {
              label: 'เมือง',
              placeholder: 'เมือง',
            },
            state: {
              label: 'รัฐ/จังหวัด',
              placeholder: 'รัฐ/จังหวัด',
            },
            postalCode: {
              label: 'รหัสไปรษณีย์',
              placeholder: 'รหัสไปรษณีย์',
            },
            country: {
              label: 'ประเทศ',
              placeholder: 'เลือกประเทศ',
            },
            phone: {
              label: 'เบอร์โทรศัพท์ (ไม่บังคับ)',
              placeholder: 'เบอร์โทรศัพท์',
            },
            isDefault: {
              label: 'ตั้งเป็นที่อยู่เริ่มต้น',
              description: 'ใช้เป็นที่อยู่เริ่มต้นสำหรับประเภทนี้',
            },
          },
        },
        marketing: {
          title: 'การตลาด',
          description: 'กำหนดค่าการตั้งค่าการตลาดและแท็ก',
          fields: {
            acceptsMarketing: {
              label: 'การตลาดทางอีเมล',
              description: 'ลูกค้าจะได้รับอีเมลทางการตลาด',
            },
            tags: {
              label: 'แท็ก',
              placeholder: 'กด Enter เพื่อเพิ่มแท็ก',
            },
          },
        },
        metrics: {
          lastLogin: {
            title: 'เข้าสู่ระบบล่าสุด',
            value: '2 ชั่วโมงที่แล้ว',
          },
          totalOrders: {
            title: 'คำสั่งซื้อทั้งหมด',
            subtitle: '+12.5% จากเดือนที่แล้ว',
          },
          itemsPurchased: {
            title: 'สินค้าที่ซื้อ',
            value: '142 รายการ',
          },
          recentPurchases: {
            title: 'การซื้อล่าสุด',
            items: {
              smartWatch: 'นาฬิกาอัจฉริยะ Pro',
              headphones: 'หูฟังไร้สาย',
              cameraLens: 'เลนส์กล้อง',
              gamingConsole: 'เครื่องเล่นเกม',
            },
            dates: {
              today: 'วันนี้เวลา 14:34 น.',
              yesterday: 'เมื่อวานเวลา 11:20 น.',
              dec18: '18 ธ.ค. 2566',
              dec15: '15 ธ.ค. 2566',
            },
          },
          totalSpending: {
            title: 'ยอดใช้จ่ายทั้งหมด',
            subtitle: '+8.2% จากเดือนที่แล้ว',
          },
          averageOrder: {
            title: 'มูลค่าคำสั่งซื้อเฉลี่ย',
            subtitle: '↑ แนวโน้มเพิ่มขึ้น',
          },
        },
      },
      fields: {
        firstName: {
          label: 'ชื่อ',
          placeholder: 'จอห์น',
        },
        lastName: {
          label: 'นามสกุล',
          placeholder: 'โด',
        },
        company: {
          label: 'บริษัท (ไม่บังคับ)',
          placeholder: 'บริษัท',
        },
        email: {
          label: 'อีเมล',
          placeholder: 'john@example.com',
          checking: 'กำลังตรวจสอบอีเมล...',
          errors: {
            inUse: 'อีเมลนี้ถูกใช้งานแล้ว',
          },
        },
        phone: {
          label: 'เบอร์โทรศัพท์',
          placeholder: '+1234567890',
        },
        tags: {
          label: 'แท็ก',
          placeholder: 'กด Enter เพื่อเพิ่มแท็ก',
        },
        verified: {
          label: 'ลูกค้าที่ยืนยันแล้ว',
          description: 'ทำเครื่องหมายลูกค้านี้เป็นลูกค้าที่ยืนยันแล้วด้วยเครื่องหมายถูก',
        },
      },
      errors: {
        notFound: 'ไม่พบลูกค้า',
      },
    },
    group: {
      title: {
        create: 'สร้างกลุ่ม',
        edit: 'แก้ไขกลุ่ม',
      },
      description: {
        create: 'สร้างกลุ่มลูกค้าใหม่',
        edit: 'อัปเดตรายละเอียดกลุ่ม',
      },
      actions: {
        save: 'บันทึกกลุ่ม',
        discard: 'ยกเลิก',
      },
      sections: {
        basicDetails: {
          title: 'ข้อมูลพื้นฐาน',
          description: 'กำหนดค่าข้อมูลพื้นฐานของกลุ่ม',
          fields: {
            name: {
              label: 'ชื่อกลุ่ม',
              placeholder: 'ระบุชื่อกลุ่ม',
              description: "เลือกชื่อที่อธิบายกลุ่มลูกค้านี้"
            },
            description: {
              label: 'คำอธิบาย',
              placeholder: 'ระบุคำอธิบายกลุ่ม',
              description: "อธิบายวิธีการใช้กลุ่มนี้"
            },
            color: {
              label: 'สีของกลุ่ม',
              description: 'เลือกสีสำหรับป้ายกลุ่ม',
            },
            status: {
              label: 'สถานะ',
              active: 'เปิดใช้งาน',
              inactive: 'ปิดใช้งาน',
              description: "ควบคุมว่ากลุ่มนี้กำลังใช้งานอยู่หรือไม่"
            },
          },
        },
        members: {
          title: 'สมาชิก',
          description: 'เพิ่มหรือลบลูกค้าออกจากกลุ่มนี้',
          actions: {
            add: 'เพิ่มสมาชิก',
            remove: 'ลบออก',
          },
          empty: {
            title: 'ไม่มีสมาชิก',
            description: 'กลุ่มนี้ยังไม่มีสมาชิก',
          },
          search: {
            placeholder: 'ค้นหาลูกค้า...',
          },
        },
        automation: {
          title: 'ระบบอัตโนมัติ',
          description: 'ตั้งค่ากฎการเพิ่มสมาชิกอัตโนมัติ',
          fields: {
            autoAssign: {
              label: 'เพิ่มสมาชิกอัตโนมัติ',
              description: 'เพิ่มลูกค้าเข้ากลุ่มโดยอัตโนมัติเมื่อตรงตามเงื่อนไข',
            },
            conditions: {
              label: 'เงื่อนไข',
              description: 'เพิ่มเงื่อนไขสำหรับการเพิ่มสมาชิกอัตโนมัติ',
              add: 'เพิ่มเงื่อนไข',
              empty: 'ยังไม่มีเงื่อนไข',
              field: {
                label: 'ฟิลด์',
                placeholder: 'เลือกฟิลด์',
              },
              operator: {
                label: 'ตัวดำเนินการ',
                placeholder: 'เลือกตัวดำเนินการ',
              },
              value: {
                label: 'ค่า',
                placeholder: 'ระบุค่า',
              },
            },
          },
        },
      },
      list: {
        title: 'กลุ่มลูกค้า',
        description: 'จัดระเบียบลูกค้าเป็นกลุ่มที่จัดการได้',
        actions: {
          create: 'สร้างกลุ่ม',
          edit: 'แก้ไข',
          delete: 'ลบ',
        },
        columns: {
          name: 'ชื่อกลุ่ม',
          members: 'สมาชิก',
          autoAssign: 'เพิ่มอัตโนมัติ',
          status: 'สถานะ',
          actions: 'การดำเนินการ',
        },
        empty: {
          title: 'ไม่พบกลุ่ม',
          description: 'เริ่มต้นด้วยการสร้างกลุ่มลูกค้าแรกของคุณ',
        },
        memberCount: '{count} สมาชิก',
        autoAssign: {
          enabled: 'เปิดใช้งาน',
          disabled: 'ปิดใช้งาน',
        },
        status: {
          active: 'เปิดใช้งาน',
          inactive: 'ปิดใช้งาน',
        },
        search: "ค้นหากลุ่มลูกค้า..."
      },
      errors: {
        notFound: 'ไม่พบกลุ่ม',
      },
    },
    tier: {
      title: {
        create: 'สร้างระดับ',
        edit: 'แก้ไขระดับ',
      },
      description: {
        create: 'สร้างระดับสมาชิกใหม่',
        edit: 'อัปเดตรายละเอียดระดับ',
      },
      actions: {
        save: 'บันทึกระดับ',
        discard: 'ยกเลิก',
      },
      sections: {
        basicDetails: {
          title: 'ข้อมูลพื้นฐาน',
          description: 'กำหนดค่าข้อมูลพื้นฐานของระดับ',
          fields: {
            name: {
              label: 'ชื่อระดับ',
              placeholder: 'ระบุชื่อระดับ',
            },
            description: {
              label: 'คำอธิบาย',
              placeholder: 'ระบุคำอธิบายระดับ',
            },
            color: {
              label: 'สีของระดับ',
              description: 'เลือกสีสำหรับป้ายระดับ',
            },
            status: {
              label: 'สถานะ',
              active: 'เปิดใช้งาน',
              inactive: 'ปิดใช้งาน',
            },
          },
        },
        requirements: {
          title: 'เงื่อนไข',
          description: 'กำหนดเกณฑ์สำหรับลูกค้าในการเข้าถึงระดับนี้',
          fields: {
            spendingAmount: {
              label: 'ยอดการใช้จ่าย',
              description: 'จำนวนเงินขั้นต่ำที่ลูกค้าต้องใช้จ่าย',
              placeholder: 'ระบุจำนวนเงิน',
            },
            orderCount: {
              label: 'จำนวนคำสั่งซื้อ',
              description: 'จำนวนคำสั่งซื้อขั้นต่ำที่ต้องการ',
              placeholder: 'ระบุจำนวนคำสั่งซื้อ',
            },
            timeframe: {
              label: 'ช่วงเวลา',
              description: 'ระยะเวลาที่ต้องทำตามเงื่อนไข',
              options: {
                lifetime: 'ตลอดอายุการใช้งาน',
                yearly: 'รายปี',
                monthly: 'รายเดือน',
              },
            },
          },
        },
        benefits: {
          title: 'สิทธิประโยชน์',
          description: 'กำหนดค่ารางวัลและสิทธิพิเศษสำหรับระดับนี้',
          fields: {
            rewardsMultiplier: {
              label: 'ตัวคูณคะแนนสะสม',
              description: 'ตัวคูณคะแนนสำหรับการซื้อ',
              placeholder: 'ระบุตัวคูณ',
            },
            discountPercentage: {
              label: 'เปอร์เซ็นต์ส่วนลด',
              description: 'ส่วนลดที่ใช้กับการซื้อทั้งหมด',
              placeholder: 'ระบุเปอร์เซ็นต์',
            },
            freeShipping: {
              label: 'จัดส่งฟรี',
              description: 'ให้บริการจัดส่งฟรีสำหรับทุกคำสั่งซื้อ',
            },
            prioritySupport: {
              label: 'บริการลูกค้าระดับพรีเมียม',
              description: 'ให้บริการลูกค้าแบบพิเศษ',
            },
            earlyAccess: {
              label: 'การเข้าถึงก่อน',
              description: 'เข้าถึงสินค้าใหม่และโปรโมชั่นก่อนใคร',
            },
          },
        },
      },
      list: {
        title: 'ระดับลูกค้า',
        description: 'จัดการระดับสมาชิกและรางวัล',
        actions: {
          create: 'เพิ่มระดับ',
        },
        columns: {
          tier: 'ระดับ',
          rewardsMultiplier: 'ตัวคูณคะแนนสะสม',
          discount: 'ส่วนลด',
          benefits: 'สิทธิประโยชน์',
          status: 'สถานะ',
        },
        empty: {
          title: 'ไม่พบระดับ',
          description: 'เริ่มต้นด้วยการสร้างระดับสมาชิกแรกของคุณ',
        },
        benefits: {
          freeShipping: 'จัดส่งฟรี',
          prioritySupport: 'บริการลูกค้าระดับพรีเมียม',
          earlyAccess: 'การเข้าถึงก่อน',
        },
        status: {
          active: 'เปิดใช้งาน',
          inactive: 'ปิดใช้งาน',
        },
        search: "ค้นหาระดับลูกค้า..."
      },
      errors: {
        notFound: 'ไม่พบระดับ',
      },
    },
    campaign: {
      title: 'แคมเปญ',
      description: 'จัดการแคมเปญคะแนนและรางวัล',
      actions: {
        create: 'สร้างแคมเปญ',
      },
      list: {
        empty: {
          title: 'ไม่พบแคมเปญ',
          description: 'เริ่มต้นด้วยการสร้างแคมเปญแรกของคุณ',
        },
        columns: {
          campaign: 'แคมเปญ',
          type: 'ประเภท',
          duration: 'ระยะเวลา',
          target: 'เป้าหมาย',
          status: 'สถานะ',
        },
        types: {
          points_multiplier: 'ตัวคูณคะแนน',
          bonus_points: 'คะแนนโบนัส',
        },
        target: {
          all: 'ลูกค้าทั้งหมด',
          tier: 'ระดับที่เฉพาะเจาะจง',
          group: 'กลุ่มที่เฉพาะเจาะจง',
        },
        status: {
          active: 'เปิดใช้งาน',
          scheduled: 'กำหนดเวลา',
          ended: 'สิ้นสุด',
        },
        duration: {
          to: 'ถึง',
        },
        search: "ค้นหาแคมเปญ..."
      },
    },
    coupon: {
      title: 'แคมเปญคูปอง',
      description: 'จัดการแคมเปญคูปองของร้านค้าของคุณ',
      actions: {
        create: 'สร้างแคมเปญ',
      },
      list: {
        empty: {
          title: 'ไม่พบแคมเปญคูปอง',
          description: 'เริ่มต้นด้วยการสร้างแคมเปญคูปองแรกของคุณ',
        },
        columns: {
          campaign: 'แคมเปญ',
          discount: 'ส่วนลด',
          usage: 'การใช้งาน',
          duration: 'ระยะเวลา',
          status: 'สถานะ',
        },
        discount: {
          percentage: 'ลด {value}%',
          fixed: 'ลด ${value}',
          shipping: 'จัดส่งฟรี',
          points: 'คะแนน {value}x',
        },
        usage: {
          count: 'ใช้แล้ว {count} ครั้ง',
          limit: {
            one: 'จำกัด {count} ครั้ง',
            many: 'จำกัด {count} ครั้ง',
            unlimited: 'ไม่จำกัด',
          },
        },
        duration: {
          to: 'ถึง',
        },
        status: {
          active: 'เปิดใช้งาน',
          scheduled: 'กำหนดเวลา',
          expired: 'หมดอายุ',
          draft: 'แบบร่าง',
        },
        search: "ค้นหาแคมเปญคูปอง..."
      },
    },
    campaignForm: {
      sections: {
        basicDetails: {
          title: 'ข้อมูลพื้นฐาน',
          description: 'กำหนดค่าข้อมูลพื้นฐานของแคมเปญ',
          template: {
            title: 'เทมเพลตแคมเปญ',
            types: {
              points_multiplier: 'แคมเปญตัวคูณคะแนน',
              bonus_points: 'แคมเปญคะแนนโบนัส',
            },
          },
          fields: {
            name: {
              label: 'ชื่อแคมเปญ',
              placeholder: 'เช่น แคมเปญคะแนนสองเท่าช่วงซัมเมอร์',
              description: 'เลือกชื่อที่อธิบายแคมเปญนี้',
            },
            description: {
              label: 'คำอธิบาย',
              placeholder: 'อธิบายแคมเปญของคุณ...',
              description: 'ให้รายละเอียดเกี่ยวกับวัตถุประสงค์และประโยชน์ของแคมเปญ',
            },
            startDate: {
              label: 'วันที่เริ่มต้น',
            },
            endDate: {
              label: 'วันที่สิ้นสุด',
            },
            status: {
              label: 'สถานะ',
              placeholder: 'เลือกสถานะ',
              options: {
                draft: 'แบบร่าง',
                scheduled: 'กำหนดเวลา',
                active: 'เปิดใช้งาน',
              },
            },
            type: {
              label: 'ประเภทแคมเปญ',
              placeholder: 'เลือกประเภท',
              options: {
                points_multiplier: 'ตัวคูณคะแนน',
                bonus_points: 'คะแนนโบนัส',
              },
            },
          },
        },
        pointsConfig: {
          title: 'การกำหนดค่าคะแนน',
          description: 'ตั้งค่าวิธีการรับคะแนนในแคมเปญนี้',
          fields: {
            multiplier: {
              label: 'ตัวคูณคะแนน',
              placeholder: 'ระบุค่าตัวคูณ',
              description: 'คะแนนพื้นฐานควรคูณด้วยจำนวนเท่าใด',
            },
            bonusPoints: {
              label: 'คะแนนโบนัส',
              placeholder: 'ระบุคะแนนโบนัส',
              description: 'จำนวนคะแนนโบนัสที่จะมอบให้',
            },
          },
        },
        conditions: {
          title: 'เงื่อนไข',
          description: 'กำหนดเงื่อนไขสำหรับการรับคะแนน',
          fields: {
            minimumPurchase: {
              label: 'ยอดซื้อขั้นต่ำ',
              placeholder: 'ระบุจำนวนขั้นต่ำ',
              description: 'ยอดซื้อขั้นต่ำที่ต้องการเพื่อรับคะแนน',
            },
            maximumPoints: {
              label: 'คะแนนสูงสุด',
              placeholder: 'ระบุคะแนนสูงสุด',
              description: 'คะแนนสูงสุดที่สามารถรับได้ต่อธุรกรรม',
            },
          },
        },
        limitations: {
          title: 'ข้อจำกัด',
          description: 'กำหนดข้อจำกัดในการใช้แคมเปญ',
          fields: {
            usageLimit: {
              label: 'จำกัดการใช้งาน',
              placeholder: 'ระบุจำนวนจำกัดการใช้งาน',
              description: 'จำนวนครั้งสูงสุดที่แคมเปญนี้สามารถใช้ได้',
            },
            userLimit: {
              label: 'จำกัดต่อผู้ใช้',
              placeholder: 'ระบุจำนวนจำกัดต่อผู้ใช้',
              description: 'จำนวนครั้งสูงสุดที่ผู้ใช้แต่ละคนสามารถใช้แคมเปญนี้ได้',
            },
          },
        },
        displaySettings: {
          title: 'การตั้งค่าการแสดงผล',
          description: 'กำหนดค่าการแสดงแคมเปญให้กับลูกค้า',
          fields: {
            showProgress: {
              label: 'แสดงความคืบหน้า',
              description: 'แสดงความคืบหน้าในการบรรลุเป้าหมายแคมเปญ',
            },
            showRemaining: {
              label: 'แสดงที่เหลือ',
              description: 'แสดงการใช้งานที่เหลือหรือคะแนนที่มีอยู่',
            },
          },
        },
        qrCodeConfig: {
          title: 'การกำหนดค่า QR Code',
          description: 'ตั้งค่า QR Code สำหรับแคมเปญนี้',
          fields: {
            enabled: {
              label: 'เปิดใช้งาน QR Code',
              description: 'อนุญาตให้ลูกค้ารับคะแนนโดยการสแกน QR Code',
            },
            points: {
              label: 'คะแนนต่อการสแกน',
              placeholder: 'ระบุคะแนนต่อการสแกน',
              description: 'จำนวนคะแนนที่ได้รับต่อการสแกน QR Code',
            },
            scanLimit: {
              label: 'จำกัดการสแกน',
              placeholder: 'ระบุจำนวนจำกัดการสแกน',
              description: 'จำนวนครั้งสูงสุดที่สามารถสแกน QR Code แต่ละรหัสได้',
            },
          },
        },
        clickLinkConfig: {
          title: 'การกำหนดค่าการคลิกลิงก์',
          description: 'ตั้งค่าการคลิกลิงก์สำหรับแคมเปญนี้',
          fields: {
            enabled: {
              label: 'เปิดใช้งานการคลิกลิงก์',
              description: 'อนุญาตให้ลูกค้ารับคะแนนโดยการคลิกลิงก์',
            },
            points: {
              label: 'คะแนนต่อการคลิก',
              placeholder: 'ระบุคะแนนต่อการคลิก',
              description: 'จำนวนคะแนนที่ได้รับต่อการคลิกลิงก์',
            },
            clickLimit: {
              label: 'จำกัดการคลิก',
              placeholder: 'ระบุจำนวนจำกัดการคลิก',
              description: 'จำนวนครั้งสูงสุดที่สามารถคลิกลิงก์แต่ละลิงก์ได้',
            },
          },
        },
      },
    },
  },
}; 
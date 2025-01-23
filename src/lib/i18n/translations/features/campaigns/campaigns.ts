export const campaignTranslations = {
  en: {
    sections: {
      basicDetails: {
        title: "Basic Details",
        description: "Configure the basic settings for your campaign",
        template: {
          title: "Campaign Template",
          description: "Choose a template to get started quickly",
          label: "Template",
          actions: {
            change: "Change Template",
          },
          modal: {
            title: "Choose a Template",
            description: "Select a template that best fits your campaign goals",
          },
          indicator: {
            label: "Template",
            features: {
              title: "Key Features",
              qr: {
                scanning: "QR code scanning",
                points: "Points per scan",
                limits: "Scan limits",
              },
              multiplier: {
                points: "Points multiplier",
                stackable: "Stackable with other campaigns",
                timing: "Time-based activation",
              },
              bonus: {
                points: "Fixed bonus points",
                triggers: "Custom triggers",
                targeting: "Customer targeting",
              },
            },
          },
          types: {
            share_link: {
              title: "Share Link to Get Points",
              description: "Reward customers for sharing and clicking links",
            },
            scan_points: {
              title: "Scan to Get Points",
              description: "Reward customers for scanning QR codes",
            },
            double_points: {
              title: "Double Points Days",
              description: "Double points on all purchases",
            },
            bonus_points: {
              title: "Bonus Points",
              description: "Award bonus points for specific actions",
            },
            tier_multiplier: {
              title: "Tier Points Boost",
              description: "Increased points for specific customer tiers",
            },
          },
        },
      },
      productRules: {
        title: "Product Rules",
        description: "Define which products are eligible for this campaign",
        fields: {
          enabled: {
            label: "Enable Product Rules",
            description:
              "Limit this campaign to specific products or categories",
          },
        },
      },
      earningRules: {
        title: "Earning Rules",
        description: {
          qr: "Configure how points are awarded for QR code scans",
          default: "Configure how points are awarded for purchases",
        },
      },
    },
    coupon: {
      sections: {
        basicDetails: {
          title: "Basic Details",
          description: "Configure the basic settings for this coupon",
          fields: {
            name: {
              label: "Coupon Name",
              placeholder: "Enter coupon name",
              description: "A descriptive name for this coupon",
            },
            description: {
              label: "Description",
              placeholder: "Enter description",
              description: "Optional description for internal reference",
            },
            code: {
              label: "Coupon Code",
              placeholder: "Enter coupon code",
              description:
                "The code customers will enter to redeem this coupon",
            },
            startDate: {
              label: "Start Date",
              placeholder: "Select start date",
              description: "When this coupon becomes valid",
            },
            endDate: {
              label: "End Date",
              placeholder: "Select end date",
              description: "When this coupon expires",
            },
            status: {
              label: "Status",
              placeholder: "Select status",
              description: "Whether this coupon is active or not",
              options: {
                active: "Active",
                inactive: "Inactive",
                draft: "Draft",
                scheduled: "Scheduled",
                ended: "Ended",
              },
            },
          },
        },
        discountRules: {
          title: "Discount Rules",
          description: "Configure how this coupon applies discounts",
          fields: {
            type: {
              label: "Discount Type",
              placeholder: "Select discount type",
              description: "How the discount will be calculated",
              options: {
                percentage: "Percentage Discount",
                fixed: "Fixed Amount",
                shipping: "Free Shipping",
                points: "Bonus Points",
              },
            },
            value: {
              label: "Discount Value",
              placeholder: "Enter discount value",
              description: "The amount of discount to apply",
            },
            minPurchase: {
              label: "Minimum Purchase",
              placeholder: "Enter minimum amount",
              description: "Minimum purchase amount required",
            },
            maxDiscount: {
              label: "Maximum Discount",
              placeholder: "Enter maximum amount",
              description: "Maximum discount amount allowed",
            },
          },
        },
        usageLimits: {
          title: "Usage Limits",
          description: "Set limits on how this coupon can be used",
          fields: {
            totalLimit: {
              label: "Total Usage Limit",
              placeholder: "Enter total limit",
              description:
                "Maximum number of times this coupon can be used (leave empty for unlimited)",
            },
            perCustomer: {
              label: "Per Customer Limit",
              placeholder: "Enter per customer limit",
              description:
                "Maximum number of times each customer can use this coupon",
            },
          },
        },
        advancedConditions: {
          title: "Advanced Conditions",
          description: "Set up advanced conditions for coupon usage",
          fields: {
            advancedMode: {
              label: "Enable Advanced Mode",
              description:
                "Create complex conditions for when this coupon can be used",
            },
            ruleBuilder: {
              operators: {
                and: "AND",
                or: "OR",
              },
              actions: {
                addGroup: "Add rule group",
              },
            },
            ruleGroup: {
              match: {
                label: "Match",
                all: "All conditions",
                any: "Any condition",
              },
              actions: {
                addCondition: "Add condition",
              },
            },
            ruleConditionBuilder: {
              type: {
                label: "Condition Type",
                placeholder: "Select condition type",
                groups: {
                  cart_attributes: "Cart Attributes",
                  customer_attributes: "Customer Attributes",
                  product_attributes: "Product Attributes",
                },
                options: {
                  cart_total: "Cart Total",
                  item_count: "Item Count",
                  shipping_country: "Shipping Country",
                  customer_group: "Customer Group",
                  first_purchase: "First Purchase",
                  total_spent: "Total Spent",
                  product_quantity: "Product Quantity",
                  category: "Product Category",
                  tag: "Product Tag",
                },
              },
              operator: {
                label: "Operator",
                placeholder: "Select operator",
                options: {
                  greaterThan: "Greater than",
                  lessThan: "Less than",
                  equalTo: "Equal to",
                },
              },
              value: {
                label: "Value",
                customerGroups: {
                  vip: "VIP Customers",
                  wholesale: "Wholesale",
                  new: "New Customers",
                },
              },
            },
          },
        },
        preview: {
          fields: {
            status: {
              valid: "Valid",
              invalid: "Invalid",
            },
            code: {
              placeholder: "COUPON",
            },
            description: {
              placeholder: "No description",
            },
            discount: {
              label: "Discount",
              off: "OFF",
              freeShipping: "FREE SHIPPING",
              points: "POINTS",
            },
            validity: {
              label: "Valid Until",
            },
            usage: {
              label: "Usage",
              uses: "uses",
            },
            minPurchase: {
              label: "Min. Purchase",
              noMinimum: "No minimum",
            },
            conditions: {
              label: "Conditions",
              cartTotal: "Cart total is",
              productQuantity: "Product quantity is",
              customerGroup: "Customer belongs to",
              firstPurchase: "Customer's first purchase",
            },
            stats: {
              totalCollected: {
                label: "Total Collected",
                available: "available",
                unlimited: "Unlimited",
              },
              totalOrders: {
                label: "Total Orders",
                description: "Using this coupon",
              },
              totalSaved: {
                label: "Total Saved",
                description: "By customers",
              },
            },
          },
        },
      },
    },
  },
  th: {
    sections: {
      basicDetails: {
        title: "รายละเอียดพื้นฐาน",
        description: "กำหนดค่าพื้นฐานสำหรับแคมเปญของคุณ",
        template: {
          title: "เทมเพลตแคมเปญ",
          description: "เลือกเทมเพลตเพื่อเริ่มต้นอย่างรวดเร็ว",
          label: "เทมเพลต",
          actions: {
            change: "เปลี่ยนเทมเพลต",
          },
          modal: {
            title: "เลือกเทมเพลต",
            description: "เลือกเทมเพลตที่เหมาะกับเป้าหมายแคมเปญของคุณ",
          },
          indicator: {
            label: "เทมเพลต",
            features: {
              title: "คุณสมบัติหลัก",
              qr: {
                scanning: "สแกนคิวอาร์โค้ด",
                points: "คะแนนต่อการสแกน",
                limits: "จำกัดการสแกน",
              },
              multiplier: {
                points: "ตัวคูณคะแนน",
                stackable: "สะสมกับแคมเปญอื่นได้",
                timing: "เปิดใช้งานตามเวลา",
              },
              bonus: {
                points: "คะแนนโบนัสคงที่",
                triggers: "ทริกเกอร์กำหนดเอง",
                targeting: "การกำหนดเป้าหมายลูกค้า",
              },
            },
          },
          types: {
            share_link: {
              title: "แชร์ลิงก์เพื่อรับคะแนน",
              description: "ให้รางวัลลูกค้าสำหรับการแชร์และคลิกลิงก์",
            },
            scan_points: {
              title: "สแกนเพื่อรับคะแนน",
              description: "ให้รางวัลลูกค้าสำหรับการสแกนคิวอาร์โค้ด",
            },
            double_points: {
              title: "วันคะแนนสองเท่า",
              description: "คะแนนสองเท่าสำหรับการซื้อทั้งหมด",
            },
            bonus_points: {
              title: "คะแนนโบนัส",
              description: "ให้คะแนนโบนัสสำหรับการกระทำเฉพาะ",
            },
            tier_multiplier: {
              title: "เพิ่มคะแนนตามระดับ",
              description: "เพิ่มคะแนนสำหรับระดับลูกค้าที่กำหนด",
            },
          },
        },
      },
      productRules: {
        title: "กฎสินค้า",
        description: "กำหนดสินค้าที่มีสิทธิ์ในแคมเปญนี้",
        fields: {
          enabled: {
            label: "เปิดใช้งานกฎสินค้า",
            description: "จำกัดแคมเปญนี้เฉพาะสินค้าหรือหมวดหมู่ที่กำหนด",
          },
        },
      },
      earningRules: {
        title: "กฎการรับคะแนน",
        description: {
          qr: "กำหนดวิธีการให้คะแนนสำหรับการสแกนคิวอาร์โค้ด",
          default: "กำหนดวิธีการให้คะแนนสำหรับการซื้อ",
        },
      },
    },
    coupon: {
      sections: {
        basicDetails: {
          title: "รายละเอียดพื้นฐาน",
          description: "กำหนดค่าพื้นฐานสำหรับคูปองนี้",
          fields: {
            name: {
              label: "ชื่อคูปอง",
              placeholder: "ใส่ชื่อคูปอง",
              description: "ชื่อที่อธิบายคูปองนี้",
            },
            description: {
              label: "คำอธิบาย",
              placeholder: "ใส่คำอธิบาย",
              description: "คำอธิบายเพิ่มเติมสำหรับการอ้างอิงภายใน",
            },
            code: {
              label: "รหัสคูปอง",
              placeholder: "ใส่รหัสคูปอง",
              description: "รหัสที่ลูกค้าจะใช้เพื่อรับส่วนลด",
            },
            startDate: {
              label: "วันที่เริ่มต้น",
              placeholder: "เลือกวันที่เริ่มต้น",
              description: "วันที่คูปองนี้เริ่มใช้ได้",
            },
            endDate: {
              label: "วันที่สิ้นสุด",
              placeholder: "เลือกวันที่สิ้นสุด",
              description: "วันที่คูปองนี้หมดอายุ",
            },
            status: {
              label: "สถานะ",
              placeholder: "เลือกสถานะ",
              description: "คูปองนี้ใช้งานได้หรือไม่",
              options: {
                active: "ใช้งาน",
                inactive: "ไม่ใช้งาน",
                draft: "แบบร่าง",
                scheduled: "กำหนดเวลา",
                ended: "สิ้นสุด",
              },
            },
          },
        },
        discountRules: {
          title: "กฎการลดราคา",
          description: "กำหนดวิธีการคำนวณส่วนลดของคูปองนี้",
          fields: {
            type: {
              label: "ประเภทส่วนลด",
              placeholder: "เลือกประเภทส่วนลด",
              description: "วิธีการคำนวณส่วนลด",
              options: {
                percentage: "ส่วนลดเป็นเปอร์เซ็นต์",
                fixed: "ส่วนลดเป็นจำนวนเงิน",
                shipping: "ฟรีค่าจัดส่ง",
                points: "คะแนนโบนัส",
              },
            },
            value: {
              label: "มูลค่าส่วนลด",
              placeholder: "ใส่มูลค่าส่วนลด",
              description: "จำนวนส่วนลดที่จะใช้",
            },
            minPurchase: {
              label: "ยอดซื้อขั้นต่ำ",
              placeholder: "ใส่จำนวนขั้นต่ำ",
              description: "ยอดซื้อขั้นต่ำที่ต้องการ",
            },
            maxDiscount: {
              label: "ส่วนลดสูงสุด",
              placeholder: "ใส่จำนวนสูงสุด",
              description: "จำนวนส่วนลดสูงสุดที่อนุญาต",
            },
          },
        },
        usageLimits: {
          title: "ข้อจำกัดการใช้งาน",
          description: "กำหนดข้อจำกัดในการใช้คูปองนี้",
          fields: {
            totalLimit: {
              label: "จำกัดการใช้งานทั้งหมด",
              placeholder: "ใส่จำนวนจำกัด",
              description:
                "จำนวนครั้งสูงสุดที่คูปองนี้สามารถใช้ได้ (เว้นว่างไว้สำหรับไม่จำกัด)",
            },
            perCustomer: {
              label: "จำกัดต่อลูกค้า",
              placeholder: "ใส่จำนวนจำกัดต่อลูกค้า",
              description:
                "จำนวนครั้งสูงสุดที่ลูกค้าแต่ละคนสามารถใช้คูปองนี้ได้",
            },
          },
        },
        advancedConditions: {
          title: "เงื่อนไขขั้นสูง",
          description: "ตั้งค่าเงื่อนไขขั้นสูงสำหรับการใช้คูปอง",
          fields: {
            advancedMode: {
              label: "เปิดใช้งานโหมดขั้นสูง",
              description: "สร้างเงื่อนไขที่ซับซ้อนสำหรับการใช้คูปองนี้",
            },
            ruleBuilder: {
              operators: {
                and: "และ",
                or: "หรือ",
              },
              actions: {
                addGroup: "เพิ่มกลุ่มกฎ",
              },
            },
            ruleGroup: {
              match: {
                label: "ตรงกับ",
                all: "ทุกเงื่อนไข",
                any: "เงื่อนไขใดก็ได้",
              },
              actions: {
                addCondition: "เพิ่มเงื่อนไข",
              },
            },
            ruleConditionBuilder: {
              type: {
                label: "ประเภทเงื่อนไข",
                placeholder: "เลือกประเภทเงื่อนไข",
                groups: {
                  cart_attributes: "คุณสมบัติตะกร้า",
                  customer_attributes: "คุณสมบัติลูกค้า",
                  product_attributes: "คุณสมบัติสินค้า",
                },
                options: {
                  cart_total: "ยอดรวมตะกร้า",
                  item_count: "จำนวนสินค้า",
                  shipping_country: "ประเทศจัดส่ง",
                  customer_group: "กลุ่มลูกค้า",
                  first_purchase: "การซื้อครั้งแรก",
                  total_spent: "ยอดใช้จ่ายทั้งหมด",
                  product_quantity: "จำนวนสินค้า",
                  category: "หมวดหมู่สินค้า",
                  tag: "แท็กสินค้า",
                },
              },
              operator: {
                label: "ตัวดำเนินการ",
                placeholder: "เลือกตัวดำเนินการ",
                options: {
                  greaterThan: "มากกว่า",
                  lessThan: "น้อยกว่า",
                  equalTo: "เท่ากับ",
                },
              },
              value: {
                label: "ค่า",
                customerGroups: {
                  vip: "ลูกค้า VIP",
                  wholesale: "ขายส่ง",
                  new: "ลูกค้าใหม่",
                },
              },
            },
          },
        },
        preview: {
          fields: {
            status: {
              valid: "ใช้งานได้",
              invalid: "ใช้งานไม่ได้",
            },
            code: {
              placeholder: "คูปอง",
            },
            description: {
              placeholder: "ไม่มีคำอธิบาย",
            },
            discount: {
              label: "ส่วนลด",
              off: "ลด",
              freeShipping: "ส่งฟรี",
              points: "คะแนน",
            },
            validity: {
              label: "ใช้ได้ถึง",
            },
            usage: {
              label: "การใช้งาน",
              uses: "ครั้ง",
            },
            minPurchase: {
              label: "ยอดขั้นต่ำ",
              noMinimum: "ไม่มีขั้นต่ำ",
            },
            conditions: {
              label: "เงื่อนไข",
              cartTotal: "ยอดรวมตะกร้าเป็น",
              productQuantity: "จำนวนสินค้าเป็น",
              customerGroup: "ลูกค้าอยู่ในกลุ่ม",
              firstPurchase: "การซื้อครั้งแรกของลูกค้า",
            },
            stats: {
              totalCollected: {
                label: "ใช้ไปแล้วทั้งหมด",
                available: "เหลือ",
                unlimited: "ไม่จำกัด",
              },
              totalOrders: {
                label: "ออเดอร์ทั้งหมด",
                description: "ที่ใช้คูปองนี้",
              },
              totalSaved: {
                label: "ประหยัดไปทั้งหมด",
                description: "โดยลูกค้า",
              },
            },
          },
        },
      },
    },
  },
};

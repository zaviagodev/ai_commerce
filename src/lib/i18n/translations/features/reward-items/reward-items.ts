export const rewardItemsTranslation = {
    en: {
        list: {
            title: 'Reward Items',
            description: 'Manage your store\'s redeemable reward items',
            actions: {
              addRewardItem: 'Add reward item'
            },
            table: {
              headers: {
                item: 'Item',
                status: 'Status',
                category: 'Category',
                pointsRequired: 'Points Required',
                quantity: 'Quantity'
              },
              empty: {
                title: 'No reward items found',
                description: 'Get started by adding your first reward item'
              },
              cells: {
                sku: 'SKU: {value}',
                uncategorized: 'Uncategorized',
                inStock: '{count} in stock',
                notTracked: 'Not tracked',
                point: 'point',
                points: 'points',
                pointsValue: 'Value:',
              },
              status: {
                active: 'active',
                archived: 'archived',
                draft: 'draft'
              }
            },
            search: "Search reward items..."
          }
    },
    th: {
        list: {
            title: 'รายการรางวัล',
            description: 'จัดการรายการแลกรางวัลของร้านค้าของคุณ',
            actions: {
              addRewardItem: 'เพิ่มรายการรางวัล',
            },
            table: {
              headers: {
                item: 'รายการ',
                status: 'สถานะ',
                category: 'หมวดหมู่',
                pointsRequired: 'คะแนนที่แลกได้',
                quantity: 'จำนวน'
              },
              empty: {
                title: 'ไม่พบรายการรางวัล',
                description: 'เริ่มต้นด้วยการเพิ่มรายการรางวัลแรกของคุณ'
              },
              cells: {
                sku: 'รหัสรายการรางวัล: {value}',
                uncategorized: "ไม่มีหมวดหมู่",
                inStock: "ในคลัง",
                notTracked: "ไม่ได้ติดตาม",
                point: 'คะแนน',
                points: 'คะแนน',
                pointsValue: 'ค่า:',
              },
              status: {
                active: 'ใช้งาน',
                archived: 'เก็บถาวร',
                draft: 'ฉบับร่าง'
              }
            },
            search: "ค้นหารายการรางวัล..."
          },
    }
}
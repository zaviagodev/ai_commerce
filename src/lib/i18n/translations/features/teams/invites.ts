export const invites = {
    en: {
      title: 'Share Invite Link',
      subtitle: 'Share this link to invite team members',
      generateLink: 'Generate Link',
      generating: 'Generating...',
      noLink: {
        title: 'No active invite link',
        subtitle: 'Generate a link to invite team members',
      },
      settings: {
        role: {
          label: 'Role',
          description: 'Select role for new members',
          options: {
            admin: 'Admin',
            editor: 'Editor',
            viewer: 'Viewer',
          },
        },
        expiration: {
          label: 'Expires in',
          options: {
            '24h': '24 hours',
            '7d': '7 days',
            '30d': '30 days',
            never: 'Never',
          },
        },
        maxUses: {
          label: 'Max uses',
          options: {
            '1': '1 use',
            '5': '5 uses',
            '10': '10 uses',
            '25': '25 uses',
            unlimited: 'Unlimited',
          },
        },
      },
      link: {
        title: 'Invite Link',
        subtitle: {
          admin: 'Anyone with this link can join as admin',
          editor: 'Anyone with this link can join as editor',
          viewer: 'Anyone with this link can join as viewer',
        },
        status: {
          active: 'Active',
        },
        empty: 'No active invite link',
        generating: 'Creating your invite link...',
        generated: 'New invite link generated',
        error: 'Failed to generate link',
        copied: 'Link copied to clipboard',
        copyError: 'Failed to copy link',
        generateButton: 'Generate Link',
        generatingButton: 'Generating...',
        done: 'Done',
        expiration: 'Expires {{date}}',
        uses: '{{count}} {{count === "1" ? "use" : "uses"}} remaining',
      },
      success: {
        title: 'Invite link generated',
        subtitle: 'Share this link with your team members',
        copied: 'Link copied to clipboard',
      },
    },
    th: {
        title: 'แชร์ลิงก์เชิญ',
        subtitle: 'แชร์ลิงก์นี้เพื่อเชิญสมาชิกทีม',
        generateLink: 'สร้างลิงก์',
        generating: 'กำลังสร้าง...',
        noLink: {
          title: 'ไม่มีลิงก์เชิญที่ใช้งานอยู่',
          subtitle: 'สร้างลิงก์เพื่อเชิญสมาชิกทีม',
        },
        settings: {
          role: {
            label: 'บทบาท',
            description: 'เลือกบทบาทสำหรับสมาชิกใหม่',
            options: {
              admin: 'ผู้ดูแล',
              editor: 'ผู้แก้ไข',
              viewer: 'ผู้ชม',
            },
          },
          expiration: {
            label: 'หมดอายุใน',
            options: {
              '24h': '24 ชั่วโมง',
              '7d': '7 วัน',
              '30d': '30 วัน',
              never: 'ไม่มีกำหนด',
            },
          },
          maxUses: {
            label: 'จำนวนการใช้สูงสุด',
            options: {
              '1': '1 ครั้ง',
              '5': '5 ครั้ง',
              '10': '10 ครั้ง',
              '25': '25 ครั้ง',
              unlimited: 'ไม่จำกัด',
            },
          },
        },
        link: {
          title: 'ลิงก์เชิญ',
          subtitle: {
            admin: 'ผู้ที่มีลิงก์นี้สามารถเข้าร่วมเป็นผู้ดูแล',
            editor: 'ผู้ที่มีลิงก์นี้สามารถเข้าร่วมเป็นผู้แก้ไข',
            viewer: 'ผู้ที่มีลิงก์นี้สามารถเข้าร่วมเป็นผู้ชม',
          },
          status: {
            active: 'ใช้งานได้',
          },
          empty: 'ไม่มีลิงก์เชิญที่ใช้งานได้',
          generating: 'กำลังสร้างลิงก์เชิญ...',
          generated: 'สร้างลิงก์เชิญใหม่แล้ว',
          error: 'ไม่สามารถสร้างลิงก์ได้',
          copied: 'คัดลอกลิงก์แล้ว',
          copyError: 'ไม่สามารถคัดลอกลิงก์ได้',
          generateButton: 'สร้างลิงก์',
          generatingButton: 'กำลังสร้าง...',
          done: 'เสร็จสิ้น',
          expiration: 'หมดอายุ {{date}}',
          uses: 'เหลือการใช้งาน {{count}} ครั้ง',
        },
        success: {
          title: 'สร้างลิงก์เชิญแล้ว',
          subtitle: 'แชร์ลิงก์นี้กับสมาชิกทีมของคุณ',
          copied: 'คัดลอกลิงก์แล้ว',
        },
    },
  };
  
export const invites = {
  en: {
    title: "Share Invite Link",
    subtitle: "Share this link to invite team members",
    generateLink: "Generate Link",
    generating: "Generating...",
    noLink: {
      title: "No active invite link",
      subtitle: "Generate a link to invite team members",
      takeMoment: "This will only take a moment",
    },
    settings: {
      role: {
        label: "Role",
        description: "Select role for new members",
        options: {
          admin: "Admin",
          editor: "Editor",
          viewer: "Viewer",
        },
      },
      expiration: {
        label: "Expires in",
        options: {
          hours24: "24 hours",
          days7: "7 days",
          days30: "30 days",
          never: "Never",
        },
      },
      maxUses: {
        label: "Max uses",
        options: {
          one: "1 use",
          five: "5 uses",
          ten: "10 uses",
          twentyFive: "25 uses",
          unlimited: "Unlimited",
        },
      },
    },
    link: {
      title: "Invite Link",
      subtitle: {
        admin: "Anyone with this link can join as admin",
        editor: "Anyone with this link can join as editor",
        viewer: "Anyone with this link can join as viewer",
      },
      status: {
        active: "Active",
      },
      empty: "No active invite link",
      generating: "Creating your invite link...",
      generated: "New invite link generated",
      error: "Failed to generate link",
      copied: "Link copied to clipboard",
      copyError: "Failed to copy link",
      generateButton: "Generate Link",
      generatingButton: "Generating...",
      done: "Done",
      expiration: "Expires {{date}}",
      uses: '{{count}} {{count === "1" ? "use" : "uses"}} remaining',
    },
    success: {
      title: "Invite link generated",
      subtitle: "Share this link with your team members",
      copied: "Link copied to clipboard",
    },
  },
  th: {
    title: "แชร์ลิงก์เชิญ",
    subtitle: "แชร์ลิงก์นี้เพื่อเชิญสมาชิกทีม",
    generateLink: "สร้างลิงก์",
    generating: "กำลังสร้าง...",
    noLink: {
      title: "ไม่มีลิงก์เชิญที่ใช้งานอยู่",
      subtitle: "สร้างลิงก์เพื่อเชิญสมาชิกทีม",
      takeMoment: "จะใช้เวลาเพียงแค่ชั่วครู่",
    },
    settings: {
      role: {
        label: "บทบาท",
        description: "เลือกบทบาทสำหรับสมาชิกใหม่",
        options: {
          admin: "ผู้ดูแล",
          editor: "ผู้แก้ไข",
          viewer: "ผู้ชม",
        },
      },
      expiration: {
        label: "หมดอายุใน",
        options: {
          hours24: "24 ชั่วโมง",
          days7: "7 วัน",
          days30: "30 วัน",
          never: "ไม่มีกำหนด",
        },
      },
      maxUses: {
        label: "จำนวนการใช้สูงสุด",
        options: {
          one: "1 ครั้ง",
          five: "5 ครั้ง",
          ten: "10 ครั้ง",
          twentyFive: "25 ครั้ง",
          unlimited: "ไม่จำกัด",
        },
      },
    },
    link: {
      title: "ลิงก์เชิญ",
      subtitle: {
        admin: "ผู้ที่มีลิงก์นี้สามารถเข้าร่วมเป็นผู้ดูแล",
        editor: "ผู้ที่มีลิงก์นี้สามารถเข้าร่วมเป็นผู้แก้ไข",
        viewer: "ผู้ที่มีลิงก์นี้สามารถเข้าร่วมเป็นผู้ชม",
      },
      status: {
        active: "ใช้งานได้",
      },
      empty: "ไม่มีลิงก์เชิญที่ใช้งานได้",
      generating: "กำลังสร้างลิงก์เชิญ...",
      generated: "สร้างลิงก์เชิญใหม่แล้ว",
      error: "ไม่สามารถสร้างลิงก์ได้",
      copied: "คัดลอกลิงก์แล้ว",
      copyError: "ไม่สามารถคัดลอกลิงก์ได้",
      generateButton: "สร้างลิงก์",
      generatingButton: "กำลังสร้าง...",
      done: "เสร็จสิ้น",
      expiration: "หมดอายุ {{date}}",
      uses: "เหลือการใช้งาน {{count}} ครั้ง",
    },
    success: {
      title: "สร้างลิงก์เชิญแล้ว",
      subtitle: "แชร์ลิงก์นี้กับสมาชิกทีมของคุณ",
      copied: "คัดลอกลิงก์แล้ว",
    },
  },
};

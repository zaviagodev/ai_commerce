export const payments = {
    en: {
      title: "Payment Settings",
      subtitle: "Configure your store's payment methods and gateways",
      promptpay: {
        title: 'PromptPay',
        subtitle: 'Configure PromptPay payment settings',
        enable: {
          label: 'Enable PromptPay',
          description: 'Accept payments via PromptPay QR code'
        },
        id: {
          label: 'PromptPay ID',
          description: 'Your PromptPay registered phone number or Tax ID',
          placeholder: 'Phone number or Tax ID'
        },
        accountName: {
          label: 'Account Name',
          placeholder: 'Account holder name'
        },
        qrCode: {
          label: 'QR Code Image',
          description: 'Upload your PromptPay QR code image'
        }
      },
      bankTransfer: {
        title: 'Bank Transfer',
        subtitle: 'Configure bank transfer payment settings',
        enable: {
          label: 'Enable Bank Transfer',
          description: 'Accept payments via bank transfer'
        },
        addAccount: 'Add bank account',
        accountDetails: {
          accountName: 'Account Name',
          bank: 'Bank',
          accountNumber: 'Account Number',
          branch: 'Branch',
          defaultAccount: 'Default account'
        }
      },
      gateways: {
        title: 'Payment Gateways',
        subtitle: 'Configure payment gateway integrations',
        omise: {
          enable: {
            label: 'Enable Omise',
            description: 'Accept credit card payments via Omise'
          },
          publicKey: {
            label: 'Public Key',
            description: 'Your Omise public key (starts with pkey_)'
          },
          secretKey: {
            label: 'Secret Key',
            description: 'Your Omise secret key (starts with skey_)'
          }
        }
      },
      notifications: {
        title: 'Payment Notifications',
        subtitle: 'Configure payment notification settings',
        email: {
          label: 'Email Notifications',
          description: 'Receive payment notifications via email',
          placeholder: 'notifications@example.com'
        },
        line: {
          label: 'LINE Notifications',
          description: 'Receive payment notifications via LINE',
          token: {
            label: 'LINE Notify Token',
            description: 'Your LINE Notify access token'
          }
        }
      }
    },
    th: {
      title: "การตั้งค่าการชำระเงิน",
      subtitle: "กำหนดค่าวิธีและช่องทางการชำระเงินของร้านค้าของคุณ",
      promptpay: {
        title: 'พร้อมเพย์',
        subtitle: 'ตั้งค่าการชำระเงินผ่านพร้อมเพย์',
        enable: {
          label: 'เปิดใช้งานพร้อมเพย์',
          description: 'รับชำระเงินผ่าน QR code พร้อมเพย์'
        },
        id: {
          label: 'รหัสพร้อมเพย์',
          description: 'เบอร์โทรศัพท์หรือเลขประจำตัวผู้เสียภาษีที่ลงทะเบียนพร้อมเพย์',
          placeholder: 'เบอร์โทรศัพท์หรือเลขประจำตัวผู้เสียภาษี'
        },
        accountName: {
          label: 'ชื่อบัญชี',
          placeholder: 'ชื่อเจ้าของบัญชี'
        },
        qrCode: {
          label: 'รูป QR Code',
          description: 'อัพโหลดรูป QR code พร้อมเพย์ของคุณ'
        }
      },
      bankTransfer: {
        title: 'โอนเงินผ่านธนาคาร',
        subtitle: 'ตั้งค่าการชำระเงินผ่านการโอนเงิน',
        enable: {
          label: 'เปิดใช้งานการโอนเงิน',
          description: 'รับชำระเงินผ่านการโอนเงิน'
        },
        addAccount: 'เพิ่มบัญชีธนาคาร',
        accountDetails: {
          accountName: 'ชื่อบัญชี',
          bank: 'ธนาคาร',
          accountNumber: 'เลขที่บัญชี',
          branch: 'สาขา',
          defaultAccount: 'บัญชีหลัก'
        }
      },
      gateways: {
        title: 'ระบบชำระเงิน',
        subtitle: 'ตั้งค่าการเชื่อมต่อระบบชำระเงิน',
        omise: {
          enable: {
            label: 'เปิดใช้งาน Omise',
            description: 'รับชำระเงินผ่านบัตรเครดิตด้วย Omise'
          },
          publicKey: {
            label: 'Public Key',
            description: 'Omise public key ของคุณ (ขึ้นต้นด้วย pkey_)'
          },
          secretKey: {
            label: 'Secret Key',
            description: 'Omise secret key ของคุณ (ขึ้นต้นด้วย skey_)'
          }
        }
      },
      notifications: {
        title: 'การแจ้งเตือนการชำระเงิน',
        subtitle: 'ตั้งค่าการแจ้งเตือนการชำระเงิน',
        email: {
          label: 'แจ้งเตือนทางอีเมล',
          description: 'รับการแจ้งเตือนการชำระเงินผ่านอีเมล',
          placeholder: 'notifications@example.com'
        },
        line: {
          label: 'แจ้งเตือนผ่าน LINE',
          description: 'รับการแจ้งเตือนการชำระเงินผ่าน LINE',
          token: {
            label: 'LINE Notify Token',
            description: 'Access token ของ LINE Notify'
          }
        }
      }
    }
  };
  
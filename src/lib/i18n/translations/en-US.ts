export default {
  common: {
    language: "Language",
    switchLanguage: "Switch language",
  },
  auth: {
    signIn: "Sign in",
    signOut: "Sign out",
  },
  navigation: {
    dashboard: "Dashboard",
    products: "Products",
    customers: "Customers",
    orders: "Orders",
    settings: "Settings",
    overview: "Overview",
    themeSettings: "Theme Settings",
    members: "Members",
    appsStore: "Apps Store",
    platform: "Platform",
    apps: "Apps",
    categories: "Categories",
    attributes: "Attributes",
    ticketOrders: "Ticket Orders",
    events: "Events",
    campaigns: "Campaigns",
    rewardsItems: "Rewards Items",
    redeemList: "Redeem List",
    customerTiers: "Customer Tiers",
    customerGroups: "Customer Groups",
    couponCampaign: "Coupon Campaign",
    eventAndTicket: "Event & Ticket",
    pointsAndRewards: "Points & Rewards",
  },
  team: {
    members: "Team Members",
    description: "Manage your team members and their roles",
    table: {
      member: "Member",
      role: "Role",
      status: "Status",
      lastActive: "Last active",
    },
    invite: "Invite member",
    remove: "Remove member",
    actions: {
      sendReminder: "Send reminder",
      changeRole: "Change role",
    },
    freePlan: {
      title: "Free Plan",
      seatsAvailable: "{count} seats available",
      memberCount: "{current}/{max} members",
      upgradeButton: "Upgrade Plan",
      limitWarning:
        "You're approaching your member limit. Consider upgrading your plan.",
      limitReached:
        "You've reached your member limit. Upgrade to add more members.",
    },
    roles: {
      owner: "Owner",
      admin: "Admin",
      staff: "Staff",
    },
    plan: {
      free: "Free Plan",
      pro: "Pro Plan",
      enterprise: "Enterprise Plan",
      seatsAvailable: "{{count}} seats available",
      memberCount: "{{current}}/{{max}} members",
      upgradeNeeded:
        "You've reached your member limit. Upgrade to add more members.",
      approachingLimit:
        "You're approaching your member limit. Consider upgrading your plan.",
    },
    status: {
      active: "Active",
      pending: "Pending",
      inactive: "Inactive",
    },
    details: {
      basicInfo: {
        title: "Basic Information",
        description: "Member profile and contact details",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phone: "Phone Number",
        lineId: "Line ID",
        memberSince: "Member Since",
        contactSupport: "Contact support to update {field}",
      },
      rolePermissions: {
        title: "Role & Permissions",
        description: "Configure member role and access permissions",
        roleAssignment: "Role Assignment",
        permissionGroups: "Permission Groups",
        permissions: {
          products: {
            title: "Products",
            description: "Manage products and inventory",
          },
          orders: {
            title: "Orders",
            description: "Manage orders and fulfillment",
          },
          customers: {
            title: "Customers",
            description: "Manage customer data and groups",
          },
          coupons: {
            title: "Coupons",
            description: "Manage discounts and promotions",
          },
          events: {
            title: "Events & Tickets",
            description: "Manage events and ticket sales",
          },
          rewards: {
            title: "Points & Rewards",
            description: "Manage loyalty program and rewards",
          },
        },
      },
      header: {
        createdBy: "Created by",
        lastUpdated: "Last updated",
        actions: {
          suspend: "Suspend Account",
          remove: "Remove Member",
        },
      },
      removeModal: {
        title: "Remove Member",
        description: "This action cannot be undone",
        warning: "Are you sure you want to remove {name}? This will:",
        consequences: [
          "Revoke all access permissions",
          "Remove them from all teams and projects",
          "Delete their account settings",
        ],
        cancel: "Cancel",
        confirm: "Remove Member",
      },
    },
  },
} as const;

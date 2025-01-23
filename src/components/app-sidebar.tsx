"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth/auth-hooks";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  UserCircle,
  Crown,
  UsersRound,
  Folder,
} from "lucide-react";
import { TeamList } from "./team-list";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

// This is sample data.
const dashboardMenus = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
      },
    ],
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: Package,
    items: [
      {
        title: "Items",
        url: "/dashboard/products",
        icon: Package,
      },
      {
        title: "Categories",
        url: "/dashboard/categories",
        icon: Folder,
      },
    ],
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: Users,
    items: [
      {
        title: "Customers",
        url: "/dashboard/customers",
        icon: UsersRound,
      },
      {
        title: "Customer Groups",
        url: "/dashboard/customer-groups",
        icon: Users,
      },
    ],
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: ShoppingCart,
    items: [
      {
        title: "Orders",
        url: "/dashboard/orders",
      },
    ],
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: UserCircle,
    items: [
      {
        title: "Profile",
        url: "/dashboard/profile",
      },
    ],
  },
];

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
        {
          title: "Products",
          url: "/dashboard/products",
        },
        {
          title: "Customers",
          url: "/dashboard/customers",
        },
        {
          title: "Orders",
          url: "/dashboard/orders",
        },
        {
          title: "Profile",
          url: "/dashboard/profile",
        },
      ],
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: Package,
      items: [
        {
          title: "Products",
          url: "/dashboard/products",
        },
        {
          title: "Product Categories",
          url: "#",
        },
        {
          title: "Brands",
          url: "#",
        },
        {
          title: "Warehouse",
          url: "#",
        },
      ],
    },
    {
      title: "Customers",
      url: "/dashboard/customers",
      icon: Users,
      items: [
        {
          title: "Customers",
          url: "/dashboard/customers",
        },
        {
          title: "Customer Group",
          url: "#",
        },
      ],
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: ShoppingCart,
      items: [
        {
          title: "Orders",
          url: "/dashboard/orders",
        },
        {
          title: "Sales Invoices",
          url: "#",
        },
        {
          title: "Sales Returns",
          url: "#",
        },
      ],
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: UserCircle,
      items: [
        {
          title: "Profile",
          url: "/dashboard/profile",
        },
        {
          title: "Edit Profile",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setOpen } = useSidebar();
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTeamId, setActiveTeamId] = React.useState(data.teams[0].name);

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden shrink-0 [&>[data-sidebar=sidebar]]:flex-row border-none w-[280px] transition-all duration-300 ease-in-out h-full bg-white z-[45]"
      {...props}
    >
      {/* Left sidebar */}
      <Sidebar
        collapsible="none"
        className="w-12 shrink-0 border-r border-gray-200 dark:border-gray-700 h-full"
      >
        <SidebarHeader>
          <div
            className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5 mx-auto"
            style={{ width: "32px", height: "32px" }}
          >
            <Command className="h-4 w-4 text-primary" />
          </div>
        </SidebarHeader>
        {/* <SidebarContent className="flex-1">
          <TeamList
            teams={data.teams.map((team) => ({
              id: team.name,
              name: team.name,
              logo: team.logo,
            }))}
            activeTeamId={activeTeamId}
            onTeamSelect={(teamId) => {
              setActiveTeamId(teamId);
              const team = data.teams.find((t) => t.name === teamId);
              if (team) setActiveItem(data.navMain[0]);
            }}
          />
        </SidebarContent> */}
        <SidebarRail />
      </Sidebar>

      {/* Right sidebar is collapisble */}
      <Sidebar
        collapsible="none"
        className="h-full flex-1 flex absolute md:relative top-0 ml-12 md:ml-0 bg-background w-[calc(100%_-_48px)]"
      >
        <SidebarHeader>
          <TeamSwitcher storeName={user?.storeName || ""} />
        </SidebarHeader>
        <SidebarContent className="flex-1 overflow-y-auto h-full">
          <NavMain items={dashboardMenus} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser
            user={{
              name: user?.fullName || "",
              email: user?.email || "",
              avatar: data.user.avatar,
            }}
          />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </Sidebar>
  );
}

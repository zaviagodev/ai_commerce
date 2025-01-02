'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Crown,
  Folder,
  Gift,
  Ticket,
  Tags,
  Trophy,
  Settings,
  Users2,
} from 'lucide-react';
import { Link } from "react-router-dom";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
    }[];
  }[];
}) {
  return (
    <SidebarGroup className="flex h-full flex-col">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="/dashboard" className="font-medium">
              <div className="rounded-md bg-opacity-20 p-1 bg-blue-100">
                <LayoutDashboard className="h-3.5 w-3.5 text-blue-500" />
              </div>
              <span>Overview</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="/dashboard/settings" className="font-medium">
              <div className="rounded-md bg-opacity-20 p-1 bg-purple-100">
                <Settings className="h-3.5 w-3.5 text-purple-500" />
              </div>
              <span>Settings</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="/dashboard/teams" className="font-medium">
              <div className="rounded-md bg-opacity-20 p-1 bg-green-100">
                <Users2 className="h-3.5 w-3.5 text-green-500" />
              </div>
              <span>Members</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarGroupLabel className="mt-4">Platform</SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible asChild defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip="Products" className="font-medium">
                <div className="rounded-md bg-opacity-20 p-1 bg-pink-100">
                  <Package className="h-3.5 w-3.5 text-pink-500" />
                </div>
                <span>Products</span>
                <ChevronRight className="ml-auto h-2 w-2 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/products" className="font-medium">
                      <Package className="h-3 w-3 text-muted-foreground" />
                      <span>Products</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/products/categories" className="font-medium">
                      <Folder className="h-3 w-3 text-muted-foreground" />
                      <span>Categories</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        <Collapsible asChild defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip="Orders" className="font-medium">
                <div className="rounded-md bg-opacity-20 p-1 bg-orange-100">
                  <ShoppingCart className="h-3.5 w-3.5 text-orange-500" />
                </div>
                <span>Orders</span>
                <ChevronRight className="ml-auto h-2 w-2 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/orders" className="font-medium">
                      <ShoppingCart className="h-3 w-3 text-muted-foreground" />
                      <span>Orders</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        <Collapsible asChild defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip="Customers" className="font-medium">
                <div className="rounded-md bg-opacity-20 p-1 bg-purple-100">
                  <Users className="h-3.5 w-3.5 text-purple-500" />
                </div>
                <span>Customers</span>
                <ChevronRight className="ml-auto h-2 w-2 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/customers" className="font-medium">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span>Customers</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/customers/tiers" className="font-medium">
                      <Crown className="h-3 w-3 text-muted-foreground" />
                      <span>Customer Tiers</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/customers/groups" className="font-medium">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span>Customer Groups</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
        <Collapsible
          asChild
          defaultOpen={false}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip="Coupons" className="font-medium">
                <div className="rounded-md bg-opacity-20 p-1" style={{ backgroundColor: 'rgb(244, 114, 182, 0.2)' }}>
                  <Ticket className="h-3.5 w-3.5 text-pink-500" />
                </div>
                <span>Coupons</span>
                <ChevronRight className="ml-auto h-2 w-2 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/coupons/campaigns" className="font-medium">
                      <Tags className="h-3 w-3 text-muted-foreground" />
                      <span>Coupon Campaign</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
      
      {/* Apps Section */}
      <SidebarGroupLabel className="mt-2">Apps</SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible
          asChild
          defaultOpen={false}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip="Event & Ticket" className="font-medium">
                <div className="rounded-md bg-opacity-20 p-1" style={{ backgroundColor: 'rgb(147, 197, 253, 0.2)' }}>
                  <Ticket className="h-3.5 w-3.5 text-blue-500" />
                </div>
                <span>Event & Ticket</span>
                <ChevronRight className="ml-auto h-2 w-2 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/products2" className="font-medium">
                      <Ticket className="h-3 w-3 text-muted-foreground" />
                      <span>Event & Ticket</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        <Collapsible
          asChild
          defaultOpen={false}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip="Points & Rewards" className="font-medium">
                <div className="rounded-md bg-opacity-20 p-1" style={{ backgroundColor: 'rgb(253, 224, 71, 0.2)' }}>
                  <Gift className="h-3.5 w-3.5 text-yellow-500" />
                </div>
                <span>Points & Rewards</span>
                <ChevronRight className="ml-auto h-2 w-2 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/points/campaigns" className="font-medium">
                      <Trophy className="h-3 w-3 text-muted-foreground" />
                      <span>Campaigns</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/points/rewards" className="font-medium">
                      <Gift className="h-3 w-3 text-muted-foreground" />
                      <span>Rewards Items</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/points/redeem" className="font-medium">
                      <Tags className="h-3 w-3 text-muted-foreground" />
                      <span>Redeem List</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}

function getIconColor(title: string): string {
  const colors: Record<string, string> = {
    Dashboard: '#E9F3FF', // Pastel blue
    Products: '#FFE9EC',  // Pastel pink
    Customers: '#E9FFE9', // Pastel green
    Orders: '#FFF3E9',    // Pastel orange
    Profile: '#F3E9FF',   // Pastel purple
  };
  return colors[title] || '#F5F5F5';
}

function getIconTextColor(title: string): string {
  const colors: Record<string, string> = {
    Dashboard: '#4B96FF', // Blue
    Products: '#FF4B6B',  // Pink
    Customers: '#4BFF4B', // Green
    Orders: '#FF964B',    // Orange
    Profile: '#964BFF',   // Purple
  };
  return colors[title] || '#666666';
}
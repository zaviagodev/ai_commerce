"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
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
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/i18n/hooks";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain() {
  const t = useTranslation();

  return (
    <SidebarGroup className="flex h-full flex-col">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="/dashboard" className="font-medium">
              <div className="rounded-md bg-opacity-20 p-1 bg-blue-100">
                <LayoutDashboard className="h-3.5 w-3.5 text-blue-500" />
              </div>
              <span>{t.navigation.navigation.overview.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="/dashboard/settings" className="font-medium">
              <div className="rounded-md bg-opacity-20 p-1 bg-purple-100">
                <Settings className="h-3.5 w-3.5 text-purple-500" />
              </div>
              <span>{t.navigation.navigation.settings.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="/dashboard/members" className="font-medium">
              <div className="rounded-md bg-opacity-20 p-1 bg-green-100">
                <Users2 className="h-3.5 w-3.5 text-green-500" />
              </div>
              <span>{t.navigation.navigation.members.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Products Section */}
      <SidebarGroupLabel className="mt-4">
        {t.navigation.navigation.products.title}
      </SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible asChild defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={t.navigation.navigation.products.subtitle}
                className="font-medium"
              >
                <div className="rounded-md bg-opacity-20 p-1 bg-pink-100">
                  <Package className="h-3.5 w-3.5 text-pink-500" />
                </div>
                <span>{t.navigation.navigation.products.title}</span>
                <ChevronRight className="ml-auto h-2 w-2 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/products" className="font-medium">
                      <Package className="h-3 w-3 text-muted-foreground" />
                      <span>{t.navigation.navigation.products.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/categories" className="font-medium">
                      <Folder className="h-3 w-3 text-muted-foreground" />
                      <span>{t.navigation.navigation.categories.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                {/* <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/products/attributes" className="font-medium">
                      <Tags className="h-3 w-3 text-muted-foreground" />
                      <span>{t.navigation.navigation.attributes.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem> */}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        <Collapsible asChild defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={t.navigation.navigation.orders.subtitle}
                className="font-medium"
              >
                <div className="rounded-md bg-opacity-20 p-1 bg-orange-100">
                  <ShoppingCart className="h-3.5 w-3.5 text-orange-500" />
                </div>
                <span>{t.navigation.navigation.orders.title}</span>
                <ChevronRight className="ml-auto h-2 w-2 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/orders" className="font-medium">
                      <ShoppingCart className="h-3 w-3 text-muted-foreground" />
                      <span>{t.navigation.navigation.orders.title}</span>
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
              <SidebarMenuButton
                tooltip={t.navigation.navigation.customers.subtitle}
                className="font-medium"
              >
                <div className="rounded-md bg-opacity-20 p-1 bg-purple-100">
                  <Users className="h-3.5 w-3.5 text-purple-500" />
                </div>
                <span>{t.navigation.navigation.customers.title}</span>
                <ChevronRight className="ml-auto h-2 w-2 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/customers" className="font-medium">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span>{t.navigation.navigation.customers.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      to="/dashboard/customer-groups"
                      className="font-medium"
                    >
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span>
                        {t.navigation.navigation.customerGroups.title}
                      </span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={t.navigation.navigation.coupons.subtitle}
                className="font-medium"
              >
                <div className="rounded-md bg-opacity-20 p-1 bg-pink-100">
                  <Ticket className="h-3.5 w-3.5 text-pink-500" />
                </div>
                <span>{t.navigation.navigation.coupons.title}</span>
                <ChevronRight className="ml-auto h-2 w-2 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/coupons" className="font-medium">
                      <Tags className="h-3 w-3 text-muted-foreground" />
                      <span>{t.navigation.navigation.coupons.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>

      {/* Events Section */}
      <SidebarGroupLabel className="mt-4">
        {t.navigation.navigation.eventTicket.title}
      </SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={t.navigation.navigation.eventTicket.subtitle}
                className="font-medium"
              >
                <div className="rounded-md bg-opacity-20 p-1 bg-blue-100">
                  <Ticket className="h-3.5 w-3.5 text-blue-500" />
                </div>
                <span>{t.navigation.navigation.eventTicket.title}</span>
                <ChevronRight className="ml-auto h-2 w-2 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/events" className="font-medium">
                      <Ticket className="h-3 w-3 text-muted-foreground" />
                      <span>{t.navigation.navigation.events.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/event-orders" className="font-medium">
                      <ShoppingCart className="h-3 w-3 text-muted-foreground" />
                      <span>{t.navigation.navigation.ticketOrders.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={t.navigation.navigation.pointsRewards.subtitle}
                className="font-medium"
              >
                <div className="rounded-md bg-opacity-20 p-1 bg-yellow-100">
                  <Gift className="h-3.5 w-3.5 text-yellow-500" />
                </div>
                <span>{t.navigation.navigation.pointsRewards.title}</span>
                <ChevronRight className="ml-auto h-2 w-2 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/campaigns" className="font-medium">
                      <Trophy className="h-3 w-3 text-muted-foreground" />
                      <span>{t.navigation.navigation.campaigns.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/reward-items" className="font-medium">
                      <Gift className="h-3 w-3 text-muted-foreground" />
                      <span>{t.navigation.navigation.rewardsItems.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/dashboard/redeem-list" className="font-medium">
                      <Tags className="h-3 w-3 text-muted-foreground" />
                      <span>{t.navigation.navigation.redeemList.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      to="/dashboard/customer-tiers"
                      className="font-medium"
                    >
                      <Crown className="h-3 w-3 text-muted-foreground" />
                      <span>{t.navigation.navigation.customerTiers.title}</span>
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

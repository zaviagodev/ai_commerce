import * as React from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar";

export function SidebarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-4", className)} {...props} />;
}

export function SidebarGroupLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { isCollapsed } = useSidebar();
  
  if (isCollapsed) return null;
  
  return (
    <div
      className={cn("text-xs font-medium uppercase text-muted-foreground", className)}
      {...props}
    />
  );
}

export function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1", className)} {...props} />;
}

export function SidebarMenuItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-2", className)} {...props} />;
}

export function SidebarMenuButton({
  className,
  children,
  tooltip,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { tooltip?: string }) {
  const { isCollapsed } = useSidebar();
  
  return (
    <button
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium hover:bg-accent group",
        isCollapsed && "justify-center",
        className
      )}
      {...props}
    >
      {isCollapsed ? React.Children.toArray(children)[0] : children}
    </button>
  );
}

export function SidebarMenuAction({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "ml-auto rounded-lg p-2 hover:bg-accent",
        className
      )}
      {...props}
    />
  );
}

export function SidebarMenuSub({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("pl-6 space-y-1", className)} {...props} />;
}

export function SidebarMenuSubItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-2", className)} {...props} />;
}

export function SidebarMenuSubButton({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "flex w-full items-center rounded-lg px-2 py-1.5 text-sm hover:bg-accent",
        className
      )}
      {...props}
    />
  );
}
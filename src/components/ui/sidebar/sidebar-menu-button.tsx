return (
  <button
    ref={ref}
    className={cn(
      "group flex h-8 w-full items-center gap-2 rounded-lg px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring disabled:pointer-events-none disabled:opacity-50",
      {
        "bg-sidebar-accent text-sidebar-accent-foreground": active,
        "h-8": size === "sm",
        "h-8": size === "default",
        "h-11": size === "lg",
      },
      className,
    )}
    {...props}
  >
    {icon && <div className="h-4 w-4 shrink-0">{icon}</div>}
    {children && <span className="truncate">{children}</span>}
  </button>
);

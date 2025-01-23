import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDeveloperMode } from "@/lib/developer-mode";

interface TooltipWrapperProps {
  children: ReactNode;
  componentName: string;
}

export function TooltipWrapper({
  children,
  componentName,
}: TooltipWrapperProps) {
  const { isDeveloperMode } = useDeveloperMode();

  if (!isDeveloperMode) {
    return <>{children}</>;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <code className="text-xs">{componentName}</code>
      </TooltipContent>
    </Tooltip>
  );
}

import { Code2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDeveloperMode } from "@/lib/developer-mode";
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper";

export function DeveloperSwitch() {
  const { isDeveloperMode, toggleDeveloperMode } = useDeveloperMode();

  return (
    <TooltipWrapper componentName="DeveloperModeSwitch">
      <div className="flex items-center gap-2">
        <Switch
          id="developer-mode"
          checked={isDeveloperMode}
          onCheckedChange={toggleDeveloperMode}
        />
        <Label
          htmlFor="developer-mode"
          className="flex items-center gap-2 text-sm"
        >
          <Code2 className="h-4 w-4" />
          Developer Mode
        </Label>
      </div>
    </TooltipWrapper>
  );
}

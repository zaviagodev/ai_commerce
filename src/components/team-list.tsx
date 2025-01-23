import * as React from "react";
import { Command, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Team {
  id: string;
  name: string;
  logo: React.ElementType;
}

interface TeamListProps {
  teams: Team[];
  activeTeamId: string;
  onTeamSelect: (teamId: string) => void;
}

export function TeamList({ teams, activeTeamId, onTeamSelect }: TeamListProps) {
  const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % teams.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + teams.length) % teams.length);
        break;
      case "Enter":
        if (focusedIndex !== -1) {
          onTeamSelect(teams[focusedIndex].id);
        }
        break;
    }
  };

  return (
    <div
      className="flex flex-col gap-1.5 p-1.5"
      style={{ width: "100%" }}
      role="listbox"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {teams.map((team, index) => (
        <Tooltip key={team.id}>
          <TooltipTrigger asChild>
            <button
              role="option"
              aria-selected={team.id === activeTeamId}
              className={cn(
                "relative flex h-8 w-8 items-center justify-center rounded-lg transition-all mx-auto",
                "hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                team.id === activeTeamId && "bg-primary/5",
                index === focusedIndex && "ring-2 ring-primary",
              )}
              onClick={() => onTeamSelect(team.id)}
            >
              <team.logo className="h-4 w-4 text-gray-700" />
              {team.id === activeTeamId && (
                <div className="absolute -left-[2px] top-1/2 -translate-y-1/2">
                  <div className="h-3 w-0.5 rounded-r-full bg-primary" />
                </div>
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            {team.name}
          </TooltipContent>
        </Tooltip>
      ))}

      <div className="my-1.5 border-t border-gray-200 dark:border-gray-700" />

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            role="button"
            className={cn(
              "relative flex h-8 w-8 items-center justify-center rounded-lg transition-all mx-auto",
              "hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "text-gray-500 hover:text-gray-900",
            )}
            onClick={() => {
              // Handle add app click
              console.log("Add app clicked");
            }}
          >
            <Plus className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          Add Workspace
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

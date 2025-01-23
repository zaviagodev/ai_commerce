import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

interface InputCounterProps {
  onChange: (type: "increase" | "decrease") => void;
  className?: string;
}

const InputCounter = ({ onChange, className }: InputCounterProps) => {
  return (
    <div
      className={cn(
        "flex bg-lightgray-200 h-9 px-1 items-center rounded-full",
        className,
      )}
    >
      <button
        onClick={() => onChange("decrease")}
        className="opacity-60 hover:opacity-100 p-1 h-fit hover:bg-lightgray rounded-full transition-all duration-200"
      >
        <Minus className="h-5 w-5" />
      </button>
      <div className="mx-2 h-4 w-px bg-border" />
      <button
        onClick={() => onChange("increase")}
        className="opacity-60 hover:opacity-100 p-1 h-fit hover:bg-lightgray rounded-full transition-all duration-200"
      >
        <Plus className="h-5 w-5" />
      </button>
    </div>
  );
};

export default InputCounter;

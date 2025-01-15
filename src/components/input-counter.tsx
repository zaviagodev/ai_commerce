import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

interface InputCounterProps {
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string
}

const InputCounter = ({ onIncrease, onDecrease, className } : InputCounterProps) => {
  const handleIncrease = (e: any) => {
    e.preventDefault();
    onIncrease();
  }

  const handleDecrease = (e: any) => {
    e.preventDefault();
    onDecrease();
  }

  return (
    <div className={cn('flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200', className)}>
      <button 
        onClick={handleDecrease}
        className='opacity-80 hover:opacity-100 p-1 hover:bg-lightgray rounded-full transition-all duration-200'
      >
        <Minus className='h-4 w-4 cursor-pointer' />
      </button>
      <button 
        onClick={handleIncrease}
        className='opacity-80 hover:opacity-100 p-1 hover:bg-lightgray rounded-full transition-all duration-200'
      >
        <Plus className='h-4 w-4 cursor-pointer' />
      </button>
    </div>
  )
}

export default InputCounter
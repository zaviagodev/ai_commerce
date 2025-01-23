import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppScreenshotsProps {
  screenshots: string[];
}

export function AppScreenshots({ screenshots }: AppScreenshotsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNext = () => {
    setCurrentIndex((current) =>
      current === screenshots.length - 1 ? 0 : current + 1,
    );
  };

  const showPrevious = () => {
    setCurrentIndex((current) =>
      current === 0 ? screenshots.length - 1 : current - 1,
    );
  };

  return (
    <div className="relative">
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={screenshots[currentIndex]}
            alt={`Screenshot ${currentIndex + 1}`}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-main"
          onClick={showPrevious}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-main"
          onClick={showNext}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {screenshots.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-main w-4"
                  : "bg-main/50 hover:bg-main/75"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

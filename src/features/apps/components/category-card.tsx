import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    icon: LucideIcon;
    color: string;
    count: number;
  };
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-md">
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className={`rounded-xl ${category.color} p-3`}>
            <category.icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-medium">{category.name}</h3>
            <p className="text-sm text-muted-foreground">
              {category.count} apps
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

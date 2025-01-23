import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

interface AppCardProps {
  app: {
    id: string;
    name: string;
    developer: string;
    description: string;
    icon: string;
    rating: number;
    price: number | "Free";
    category: string;
  };
}

export function AppCard({ app }: AppCardProps) {
  return (
    <Link to={`/dashboard/apps-store/${app.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="p-6">
          <div className="flex items-start gap-4">
            {/* App Icon */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
              <img
                src={app.icon}
                alt={app.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
              />
            </div>

            {/* App Info */}
            <div className="flex-1 space-y-1">
              <h3 className="font-medium leading-none">{app.name}</h3>
              <p className="text-sm text-muted-foreground">{app.developer}</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < app.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {app.category}
                </Badge>
              </div>
            </div>

            {/* Price */}
            <div className="text-sm font-medium">
              {app.price === "Free" ? "Free" : `$${app.price.toFixed(2)}/mo`}
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
            {app.description}
          </p>
        </div>
      </Card>
    </Link>
  );
}

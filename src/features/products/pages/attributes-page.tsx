import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AttributesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between -mx-6 py-3 px-6 sticky top-0 z-10 pt-14">
        <div>
          <h1 className="text-2xl font-semibold">Product Attributes</h1>
          <p className="text-sm text-muted-foreground">
            Manage custom attributes for your products
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/products/attributes/new">
            <Plus className="mr-2 h-4 w-4" />
            Add attribute
          </Link>
        </Button>
      </div>
    </div>
  );
}

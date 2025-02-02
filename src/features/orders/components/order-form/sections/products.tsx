import { UseFormReturn } from "react-hook-form";
import { Plus, Minus, Package, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ProductSelect } from "../../product-select";
import { Order, OrderItem } from "@/types/order";
import { ProductSkeletons } from "./products/product-skeleton";
import { formatCurrency } from "@/lib/utils";
import { ProductVariant } from "@/types/product";
import { Product } from "@/types/product";
import { useTranslation } from "@/lib/i18n/hooks";
import { cn } from "@/lib/utils";

interface ProductsProps {
  form: UseFormReturn<Order>;
}

export function Products({ form }: ProductsProps) {
  const t = useTranslation();
  const items: OrderItem[] = form.watch("items") || [];

  const handleProductSelect = (product: Product, variant: ProductVariant) => {
    const existingItem = items.find((item) => item.variantId === variant.id);
    if (existingItem) {
      // Update quantity of existing item
      const updatedItems = items.map((item) => {
        if (item.variantId === variant.id) {
          const newQuantity = item.quantity + 1;
          return {
            ...item,
            quantity: newQuantity,
            total: variant.price * newQuantity,
            pointsBasedPrice: variant.pointsBasedPrice || 0,
          };
        }
        return item;
      });
      form.setValue("items", updatedItems);
    } else {
      // Add new item
      const newItem: OrderItem = {
        id: crypto.randomUUID(),
        variantId: variant.id,
        name: product.name,
        variant: {
          name: variant.name,
          options: variant.options,
        },
        price: variant.price,
        quantity: 1,
        total: variant.price,
        pointsBasedPrice: variant.pointsBasedPrice || 0,
      };
      form.setValue("items", [...items, newItem]);
    }
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          quantity: newQuantity,
          total: item.price * newQuantity,
        };
      }
      return item;
    });
    form.setValue("items", updatedItems);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100">
          <Package className="h-5 w-5 text-pink-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">
            {t.orders.orders.list.columns.products}{" "}
            <span className="text-destructive">*</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            {t.orders.orders.form.sections.products.description}
          </p>
        </div>
        <ProductSelect onSelect={handleProductSelect}>
          <Button type="button" variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            {t.orders.orders.form.sections.products.add}
          </Button>
        </ProductSelect>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <span className="text-destructive text-[0.8rem]">
            {form.formState.errors.items?.message}
          </span>
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 border rounded-lg"
            >
              <div className="relative group">
                <div className="h-[50px] w-[50px] rounded-lg border bg-muted overflow-hidden">
                  {item.product?.images?.[0] ? (
                    <img
                      src={item.product.images[0].url}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-secondary">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
                {/* Hover preview */}
                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block z-10">
                  <div className="h-[150px] w-[150px] rounded-lg border shadow-lg bg-main overflow-hidden">
                    {item.product?.images?.[0] ? (
                      <img
                        src={item.product.images[0].url}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-secondary">
                        <Package className="h-10 w-10 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-muted-foreground">
                  {item.variant?.name}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    className="w-16 text-center"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(index, parseInt(e.target.value) || 1)
                    }
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="w-32 text-right">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {formatCurrency(item.total)}
                    </span>
                    {item.pointsBasedPrice > 0 && (
                      <span className="text-sm text-green-600">
                        or {item.pointsBasedPrice * item.quantity} pts
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    const newItems = [...items];
                    newItems.splice(index, 1);
                    form.setValue("items", newItems);
                  }}
                >
                  {t.orders.orders.form.sections.products.remove}
                </Button>
              </div>
            </div>
          ))}

          {items.length === 0 && <ProductSkeletons />}
        </div>
      </CardContent>
    </Card>
  );
}

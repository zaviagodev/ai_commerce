import { UseFormReturn } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { X, Plus, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Product, VariantOption, ProductVariant } from '@/types/product';
import { VariantTable } from './variant-table';
import { useTranslation } from '@/lib/i18n/hooks';

interface VariantBuilderProps {
  form: UseFormReturn<Product>;
}

export function VariantBuilder({ form }: VariantBuilderProps) {
  const t = useTranslation();
  const [editingOptionId, setEditingOptionId] = useState<string | null>(null);
  const [newValue, setNewValue] = useState('');
  const variantOptions = form.watch('variantOptions') || [];
  const productName = form.watch('name');
  const [inputKey, setInputKey] = useState(0);

  const addOption = () => {
    form.setValue('variantOptions', [
      ...variantOptions,
      {
        id: crypto.randomUUID(),
        name: '',
        values: [],
        position: variantOptions.length,
      },
    ]);
  };

  const removeOption = (id: string) => {
    const updatedOptions = variantOptions.filter((opt) => opt.id !== id);
    form.setValue('variantOptions', updatedOptions);
    generateVariants(updatedOptions);
  };

  const updateOption = (id: string, data: Partial<VariantOption>) => {
    const updatedOptions = variantOptions.map((opt) =>
      opt.id === id ? { ...opt, ...data } : opt
    );
    form.setValue('variantOptions', updatedOptions);
    generateVariants(updatedOptions);
  };

  const addValue = (optionId: string, value: string) => {
    const option = variantOptions.find((opt) => opt.id === optionId);
    const trimmedValue = value.trim();
    
    // Reset input state first
    setNewValue('');
    setInputKey(prev => prev + 1);
    
    if (!option || !trimmedValue || option.values.includes(trimmedValue)) {
      return;
    }

    const updatedOptions = variantOptions.map((opt) =>
      opt.id === optionId 
        ? { ...opt, values: [...opt.values, trimmedValue] }
        : opt
    );

    form.setValue('variantOptions', updatedOptions);
    generateVariants(updatedOptions);
  };

  const removeValue = (optionId: string, value: string) => {
    const updatedOptions = variantOptions.map((opt) =>
      opt.id === optionId 
        ? { ...opt, values: opt.values.filter((v) => v !== value) }
        : opt
    );

    form.setValue('variantOptions', updatedOptions);
    generateVariants(updatedOptions);
  };

  const generateVariants = (options = variantOptions) => {
    // Only generate if all options have values and names
    if (!options.every((opt) => opt.name && opt.values.length > 0)) {
      return;
    }

    // Generate all possible combinations
    const combinations = options.reduce<string[][]>(
      (acc, option) => {
        if (acc.length === 0) {
          return option.values.map((value) => [value]);
        }
        return acc.flatMap((combo) =>
          option.values.map((value) => [...combo, value])
        );
      },
      []
    );
    console.log("combinations", combinations)

    // Create variants from combinations
    const existingVariants = form.watch('variants') || [];
    const newVariants = combinations.map((combo) => {
      var variantName = combo.join("-");
      // Create options array with both names and values
      const variantOptions = combo.map((value, index) => ({
        name: options[index].name,
        value: value.trim(),
      }));

      // Check if variant already exists
      // const existing = existingVariants.find((v) =>
      //   v.options.every(
      //     (opt, i) => 
      //       opt.name === variantOptions[i].name && 
      //       opt.value === variantOptions[i].value
      //   )
      // );

      // if (existing) return existing;

      // Create variant name in format: "Product Name-Large-Blue"
      variantName = `${productName}-${variantName}`;
      const variantSku = variantName.toLowerCase().replaceAll(" ", "-");
      const oldVariant = form.watch('variants').find(variant =>  variant.sku === variantName.toLowerCase().replaceAll(" ", "-"));
      return {
        id: crypto.randomUUID(),
        name: variantName,
        sku: variantSku,
        price: oldVariant?.price ?? 0,
        compareAtPrice: form.watch('compareAtPrice'),
        quantity: form.watch('trackQuantity') ? 
          oldVariant?.quantity ?? 0
          : undefined,
        options: variantOptions,
        status: 'active',
        position: combinations.indexOf(combo),
      };
    });

    form.setValue('variants', newVariants);
  };

  // Generate variants whenever options change
  useEffect(() => {
    if (variantOptions.length > 0) {
      generateVariants();
    }
  }, [variantOptions, productName]);

  return (
    <div className="space-y-6">
      {/* Variant Options */}
      <div className="space-y-4">
        {variantOptions.map((option, index) => (
          <div
            key={option.id}
            className="flex items-start gap-4 rounded-lg border p-4"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="cursor-grab"
            >
              <GripVertical className="h-4 w-4" />
            </Button>

            <div className="flex-1 space-y-4">
              {/* Option Name */}
              <Input
                // placeholder={`Option ${index + 1} (e.g., ${isEventProduct ? 'Time slots' : 'Size, Color'})`}
                placeholder={t.products.products.form.sections.variations.optionNamePlaceholder.replace("{index}", Number(index + 1))}
                value={option.name}
                onChange={(e) =>
                  updateOption(option.id, { name: e.target.value })
                }
                onKeyDown={(e) => {
                  /* When pressing 'Enter' it will open the item actions modal, so I prevent it by setting this function */
                  if (e.key === "Enter") e.preventDefault()
                }}
              />

              {/* Option Values */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => (
                    <Badge
                      key={value}
                      variant="secondary"
                      className="gap-1 text-sm font-medium"
                    >
                      {value}
                      <button
                        type="button"
                        className="ml-1 rounded-full"
                        onClick={() => removeValue(option.id, value)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>

                {editingOptionId === option.id ? (
                  <div className="flex gap-2">
                    <Input
                      key={inputKey}
                      placeholder={t.products.products.form.sections.variations.optionValuesPlaceholder}
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      autoFocus
                      onBlur={() => {
                        if (newValue.trim()) {
                          addValue(option.id, newValue);
                        }
                        setEditingOptionId(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newValue) {
                          e.preventDefault();
                          addValue(option.id, newValue);
                          setEditingOptionId(null);
                        } else if (e.key === 'Escape') {
                          setEditingOptionId(null);
                          setNewValue('');
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (newValue) {
                          addValue(option.id, newValue);
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingOptionId(option.id)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {t.products.products.form.sections.variations.addValue}
                  </Button>
                )}
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeOption(option.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {variantOptions.length < 3 && (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={addOption}
          >
            <Plus className="mr-2 h-4 w-4" />
            {t.products.products.form.sections.variations.addAnotherOption}
          </Button>
        )}
      </div>

      {/* Variant Table */}
      {variantOptions.length > 0 && (
        <VariantTable form={form} />
      )}
    </div>
  );
}
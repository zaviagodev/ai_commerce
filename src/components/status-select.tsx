import { FormField, FormItem, FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { UseFormReturn } from "react-hook-form";

interface Options {
  label: string;
  value: string;
  badgeClassName: string;
}

interface StatusSelectProps<T> {
  form: UseFormReturn<T>;
  options: Options[];
  placeholder?: string;
}

export function StatusSelect<T>({
  form,
  options,
  placeholder,
}: StatusSelectProps<T>) {
  return (
    <FormField
      control={form.control as any}
      name="status"
      render={({ field }) => (
        <FormItem className="w-[180px] animate-fade-up">
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    value={option.value}
                    className="transition-colors"
                    key={option.value}
                  >
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={option.badgeClassName}
                      >
                        {option.label}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

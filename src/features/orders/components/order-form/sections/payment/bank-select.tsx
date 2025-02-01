import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/hooks";
import { useBanks } from "@/features/settings/hooks/use-banks";

interface BankSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function BankSelect({ value, onValueChange }: BankSelectProps) {
  const t = useTranslation();
  const { data: banks } = useBanks();

  return (
    <div className="space-y-2.5">
      <label className="text-sm font-medium text-gray-200">
        {t.orders.orders.form.sections.payment.manual.bankName}
      </label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          className={cn(
            "w-full bg-gray-800/50 border-gray-700/50 text-main",
            "hover:bg-gray-800 hover:border-gray-600",
            "focus:ring-offset-gray-900",
            "h-11",
          )}
        >
          <SelectValue
            placeholder={t.orders.orders.form.sections.payment.manual.bankName}
          />
        </SelectTrigger>
        <SelectContent
          className="bg-gray-800 border-gray-700"
          position="popper"
          sideOffset={8}
        >
          {banks?.map((bank) => (
            <SelectItem
              key={bank.bank_code}
              value={bank.bank_code}
              className="text-gray-100 focus:bg-gray-700 focus:text-main"
            >
              {`${bank.bank_name} (${bank.bank_code})`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

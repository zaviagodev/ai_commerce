import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BankAccountSchema,
  BankAccount,
} from "../../schemas/payment-settings-schema";
import { SetAsDefaultModal } from "@/features/customers/components/modal/set-as-default-modal";
import { useTranslation } from "@/lib/i18n/hooks";

interface BankAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (account: BankAccount) => void;
  banks: readonly string[];
}

export function BankAccountDialog({
  open,
  onOpenChange,
  onSubmit,
  banks,
}: BankAccountDialogProps) {
  const t = useTranslation();
  const form = useForm({
    resolver: zodResolver(BankAccountSchema),
    defaultValues: {
      id: crypto.randomUUID(),
      bankName: "",
      accountName: "",
      accountNumber: "",
      branch: "",
      isDefault: false,
    },
  });

  const handleSubmit = (data: BankAccount) => {
    onSubmit(data);
    form.reset();
  };

  const [showSetAsDefault, setShowAsDefault] = useState(false);
  const handleSetDefault = () => {
    form.setValue("isDefault", true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t.settings.payments.bankTransfer.addAccount}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t.settings.payments.bankTransfer.accountDetails.bank}{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              t.settings.payments.bankTransfer.accountDetails
                                .bank
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {banks.map((bank) => (
                          <SelectItem key={bank} value={bank}>
                            {bank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        t.settings.payments.bankTransfer.accountDetails
                          .accountName
                      }{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        t.settings.payments.bankTransfer.accountDetails
                          .accountNumber
                      }{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t.settings.payments.bankTransfer.accountDetails.branch}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <FormLabel>
                      {
                        t.settings.payments.bankTransfer.accountDetails
                          .defaultAccount
                      }
                    </FormLabel>
                    <FormControl>
                      <Switch
                        onClick={(e) => {
                          if (field.value !== true) {
                            e.preventDefault();
                            setShowAsDefault(true);
                          }
                        }}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Account</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <SetAsDefaultModal
        open={showSetAsDefault}
        onOpenChange={setShowAsDefault}
        onConfirm={handleSetDefault}
        description="Set this bank account as default"
      />
    </>
  );
}

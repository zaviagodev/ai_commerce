import { UseFormReturn } from 'react-hook-form';
import { useState } from 'react';
import { Plus, X, Home, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AddressForm } from './address-form';
import { Customer, CustomerAddress } from '@/types/customer';

interface AddressesProps {
  form: UseFormReturn<Customer>;
}

function AddressCard({ address, onEdit }: { address: CustomerAddress; onEdit: () => void }) {
  return (
    <button
      type="button"
      onClick={onEdit}
      className="relative w-full text-left group rounded-lg border p-4 hover:bg-accent/5 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
            <Home className="h-5 w-5 text-blue-500" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="font-medium">{address.firstName} {address.lastName}</p>
              {address.isDefault && (
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  Default {address.type}
                </div>
              )}
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>{address.address1}</p>
              {address.address2 && <p>{address.address2}</p>}
              <p>{address.city}, {address.state} {address.postalCode}</p>
              <p>{address.country}</p>
              {address.phone && <p>{address.phone}</p>}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
export function Addresses({ form }: AddressesProps) {
  const addresses = form.watch('addresses') || [];
  const [editingAddress, setEditingAddress] = useState<CustomerAddress | null>(null);

  const addAddress = () => {
    const newAddress: CustomerAddress = {
      id: crypto.randomUUID(),
      type: 'shipping',
      firstName: '',
      lastName: '',
      company: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phone: '',
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    form.setValue('addresses', [...addresses, newAddress]);
    setEditingAddress(newAddress);
  };

  const removeAddress = (id: string) => {
    form.setValue(
      'addresses',
      addresses.filter((address) => address.id !== id)
    );
  };

  const handleSaveAddress = (address: CustomerAddress) => {
    const newAddresses = editingAddress
      ? addresses.map(a => a.id === editingAddress.id ? address : a)
      : [...addresses, address];
    form.setValue('addresses', newAddresses);
    setEditingAddress(null);
  };
  
  const handleDeleteAddress = (id: string) => {
    form.setValue(
      'addresses',
      addresses.filter((address) => address.id !== id)
    );
    setEditingAddress(null);
  };
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
          <Home className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-medium">Addresses</h2>
          <p className="text-sm text-muted-foreground">
            Manage customer shipping and billing addresses
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={() => setEditingAddress(address)}
            />
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={addAddress}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add address
        </Button>
        <Dialog open={!!editingAddress} onOpenChange={(open) => !open && setEditingAddress(null)}>
          <DialogContent className="top-[10%] translate-y-0" aria-labelledby="address-dialog-title">
            <DialogHeader>
              <DialogTitle id="address-dialog-title">
                {editingAddress?.id ? 'Edit address' : 'Add new address'}
              </DialogTitle>
            </DialogHeader>
            {editingAddress && (
              <AddressForm
                address={editingAddress}
                onSave={handleSaveAddress}
                onDelete={() => handleDeleteAddress(editingAddress.id)}
                onCancel={() => setEditingAddress(null)}
              />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
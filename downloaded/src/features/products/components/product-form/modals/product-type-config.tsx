import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { Plus, X } from 'lucide-react';

interface ProductTypeConfigProps {
  type: string;
  product: Product;
}

export function ProductTypeConfig({ type, product }: ProductTypeConfigProps) {
  const [ticketTypes, setTicketTypes] = useState([
    { name: 'General Admission', price: 0 },
  ]);
  const [timeSlots, setTimeSlots] = useState([
    { time: '', capacity: 0 },
  ]);

  const renderConfig = () => {
    switch (type) {
      case 'tickets':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Event Details</Label>
              <Input type="datetime-local" className="w-full" />
            </div>

            <div className="space-y-4">
              <Label>Ticket Types</Label>
              {ticketTypes.map((ticket, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Ticket name"
                    value={ticket.name}
                    onChange={(e) => {
                      const newTypes = [...ticketTypes];
                      newTypes[index].name = e.target.value;
                      setTicketTypes(newTypes);
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={ticket.price}
                    onChange={(e) => {
                      const newTypes = [...ticketTypes];
                      newTypes[index].price = Number(e.target.value);
                      setTicketTypes(newTypes);
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setTicketTypes(ticketTypes.filter((_, i) => i !== index));
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setTicketTypes([...ticketTypes, { name: '', price: 0 }])}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Ticket Type
              </Button>
            </div>
          </div>
        );

      case 'booking':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Service Duration (minutes)</Label>
              <Input type="number" min="15" step="15" />
            </div>

            <div className="space-y-4">
              <Label>Available Time Slots</Label>
              {timeSlots.map((slot, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="time"
                    value={slot.time}
                    onChange={(e) => {
                      const newSlots = [...timeSlots];
                      newSlots[index].time = e.target.value;
                      setTimeSlots(newSlots);
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Capacity"
                    value={slot.capacity}
                    onChange={(e) => {
                      const newSlots = [...timeSlots];
                      newSlots[index].capacity = Number(e.target.value);
                      setTimeSlots(newSlots);
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setTimeSlots(timeSlots.filter((_, i) => i !== index));
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setTimeSlots([...timeSlots, { time: '', capacity: 0 }])}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Time Slot
              </Button>
            </div>
          </div>
        );

      case 'subscription':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Billing Cycle</Label>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label>Weekly</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Monthly</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Annually</Label>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Free Trial Period (days)</Label>
              <Input type="number" min="0" />
            </div>
          </div>
        );

      case 'digital':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Download Settings</Label>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label>Limit Downloads</Label>
                  <Switch />
                </div>
                <Input type="number" placeholder="Maximum downloads" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Link Expiration (hours)</Label>
              <Input type="number" min="1" />
            </div>
          </div>
        );

      case 'bundle':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Bundle Settings</Label>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label>Allow Individual Sales</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Dynamic Pricing</Label>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Bundle Discount (%)</Label>
              <Input type="number" min="0" max="100" />
            </div>
          </div>
        );

      case 'customizable':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Customization Options</Label>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label>Text Engraving</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Color Selection</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Size Options</Label>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Additional Fee</Label>
              <Input type="number" min="0" placeholder="Fee for customization" />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Configuration</h3>
      {renderConfig()}
    </div>
  );
}
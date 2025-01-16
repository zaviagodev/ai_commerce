import { useState } from 'react';
import { Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const DEMO_GROUPS = [
  { id: '1', name: 'VIP Customers' },
  { id: '2', name: 'New Customers' },
  { id: '3', name: 'Wholesale' },
];

interface GroupSelectorProps {
  children: React.ReactNode;
  selectedGroups: string[];
  onSelect: (groups: string[]) => void;
}

export function GroupSelector({ children, selectedGroups, onSelect }: GroupSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredGroups = DEMO_GROUPS.filter((group) =>
    group.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleGroup = (groupId: string) => {
    const newGroups = selectedGroups.includes(groupId)
      ? selectedGroups.filter(id => id !== groupId)
      : [...selectedGroups, groupId];
    onSelect(newGroups);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Customer Groups</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search groups..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ScrollArea className="max-h-[300px]">
            {filteredGroups.length > 0 ? (
              <div className="space-y-2">
                {filteredGroups.map((group) => (
                  <Button
                    key={group.id}
                    variant={selectedGroups.includes(group.id) ? 'default' : 'outline'}
                    className="w-full justify-start h-fit"
                    onClick={() => toggleGroup(group.id)}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300"
                        checked={selectedGroups.includes(group.id)}
                        onChange={() => toggleGroup(group.id)}
                      />
                      <span>{group.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <p className='text-center'>No groups found</p>
            )}
          </ScrollArea>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
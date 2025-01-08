<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent className="top-[10%] translate-y-0" aria-labelledby="customer-select-title">
    <DialogHeader>
      <DialogTitle id="customer-select-title">Select customer</DialogTitle>
    </DialogHeader>
    <div className="space-y-4">
      <Input
        placeholder="Search customers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="max-h-[300px] space-y-2 overflow-y-auto">
        {filteredCustomers.map((customer) => (
          <Button
            key={customer.id}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              field.onChange(customer.id);
              form.setValue('customerName', `${customer.firstName} ${customer.lastName}`);
              form.setValue('customerEmail', customer.email);
              setOpen(false);
            }}
          >
            <div className="text-left">
              <div>
                {customer.firstName} {customer.lastName}
              </div>
              <div className="text-sm text-muted-foreground">
                {customer.email}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
    <div className="flex justify-end px-6 py-4 border-t bg-gray-50/50">
      <Button variant="outline" onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </div>
  </DialogContent>
</Dialog>
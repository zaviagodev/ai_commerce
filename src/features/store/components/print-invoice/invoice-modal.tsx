@@ .. @@
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogTrigger asChild>{children}</DialogTrigger>
-      <DialogContent className="max-w-4xl print:shadow-none">
+      <DialogContent className="max-w-4xl print:shadow-none" aria-labelledby="invoice-preview-title">
         <DialogHeader className="flex flex-row items-center justify-between print:hidden">
-          <DialogTitle>Invoice Preview</DialogTitle>
+          <DialogTitle id="invoice-preview-title">Invoice Preview</DialogTitle>
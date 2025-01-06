@@ .. @@
   return (
     <Dialog open={open} onOpenChange={setOpen}>
       <DialogTrigger asChild>{children}</DialogTrigger>
-      <DialogContent className="sm:max-w-[600px]">
+      <DialogContent className="sm:max-w-[600px]" aria-labelledby="product-select-title">
         <DialogHeader>
-          <DialogTitle>Select product</DialogTitle>
+          <DialogTitle id="product-select-title">Select product</DialogTitle>
         </DialogHeader>
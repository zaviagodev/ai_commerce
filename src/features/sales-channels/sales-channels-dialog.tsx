@@ .. @@
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogTrigger asChild>{children}</DialogTrigger>
-      <DialogContent className="max-w-md">
+      <DialogContent 
+        className="max-w-md top-[10%] translate-y-0" 
+        aria-labelledby="sales-channels-title"
+      >
         <DialogHeader>
-          <DialogTitle>Sales Channels</DialogTitle>
+          <DialogTitle id="sales-channels-title">Sales Channels</DialogTitle>
         </DialogHeader>
         <ScrollArea className="max-h-[60vh]">
           <div className="space-y-4 p-1">
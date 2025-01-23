<Dialog>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent
    className="sm:max-w-md top-[10%] translate-y-0"
    aria-labelledby="share-dialog-title"
  >
    <DialogHeader className="flex flex-row items-start gap-4">
      <div className="relative h-16 w-16 shrink-0 rounded-lg border bg-muted overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Image className="h-6 w-6 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <DialogTitle id="share-dialog-title">Share {title}</DialogTitle>
        <DialogDescription>
          Choose who can access this product
        </DialogDescription>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>;

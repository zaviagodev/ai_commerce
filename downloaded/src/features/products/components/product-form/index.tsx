import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/lib/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Form,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ScrollFade } from '@/components/ui/scroll-fade';
import { ImagePlus, ClipboardEdit, DollarSign, BarChart3, Truck, Tags, Share2, Link, MessageSquare, Heart, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ShareModal } from '@/components/share/share-modal';
import { ProductSchema } from '../../schemas/product-schema';
import { DEFAULT_TIERS } from '../../data/tiers';
import { BasicDetails } from './sections/basic-details';
import { Media } from './sections/media';
import { Pricing } from './sections/pricing';
import { Variations } from './sections/variations';
import { Inventory } from './sections/inventory';
import { Shipping } from './sections/shipping';
import { Organization } from './sections/organization';
import { SalesChannelsSection } from '@/components/sales-channels/sales-channels-section';
import { PointsRewards } from './sections/points-rewards';
import { EventDetails } from './sections/event-details';
import { useLocation } from 'react-router-dom';
import { Product } from '@/types/product';

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: Product) => Promise<void>;
  headerActions?: React.ReactNode;
}

export function ProductForm({ initialData, onSubmit, headerActions }: ProductFormProps) {
  const { user } = useAuth();
  const location = useLocation();
  const isEventProduct = location.pathname.startsWith('/dashboard/products2');
  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: '',
      images: [],
      category: undefined,
      hasVariants: false,
      variantOptions: [],
      variants: [],
      price: 0,
      compareAtPrice: undefined,
      cost: undefined,
      sku: '',
      barcode: '',
      trackQuantity: false,
      quantity: undefined,
      weight: 0,
      weightUnit: 'kg',
      pointsEnabled: false,
      pointsEarned: 0,
      pointsRequired: 0,
      pointsValue: 0,
      customerTiers: DEFAULT_TIERS,
      salesChannels: [],
      tags: [],
      status: 'draft',
      ...initialData,
    },
  });

  const handleSubmit = async (data: Product) => {
    console.log("data", data)
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  const productName = form.watch('name');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(productName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEditing = () => {
    setIsEditing(true);
    setEditedName(productName);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleNameSubmit = () => {
    if (editedName.trim()) {
      form.setValue('name', editedName.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedName(productName);
    }
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <Form {...form}>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(handleSubmit);
          }} 
          className="flex flex-col h-full"
        >
          {/* Header */}
          <div className="flex items-center pl-0 pr-6 py-3 border-b sticky top-0 z-10 bg-[rgb(245,245,245)]">
            <div className="flex flex-col w-full gap-4 sm:flex-row sm:items-center">
              {/* Left Section: Image and Title */}
              <div className="flex items-center flex-1 min-w-0">
                {/* Image Placeholder */}
                <div className="relative h-16 w-16 shrink-0 rounded-lg border bg-muted overflow-hidden mr-3">
                  {initialData?.images?.[0] ? (
                    <img
                      src={initialData.images[0].url}
                      alt={initialData.images[0].alt}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ImagePlus className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                
                {/* Title and Status */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {isEditing ? (
                      <div className="min-w-0">
                        <input
                          ref={inputRef}
                          type="text"
                          value={editedName}
                          onChange={handleNameChange}
                          onBlur={handleNameSubmit}
                          onKeyDown={handleKeyDown}
                          className="text-xl sm:text-2xl font-semibold tracking-tight bg-transparent border-none outline-none focus:ring-0 p-0 w-full"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 min-w-0">
                        <h1 
                          className="text-xl sm:text-2xl font-semibold tracking-tight cursor-text truncate"
                          onClick={handleStartEditing}
                        >
                          {productName || 'Untitled Product'}
                        </h1>
                        {initialData?.status && !isEditing && (
                          <div className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs whitespace-nowrap shrink-0">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className={cn(
                                "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                                {
                                  "bg-green-400": initialData.status === "active",
                                  "bg-red-400": initialData.status === "archived", 
                                  "bg-gray-400": initialData.status === "draft"
                                }
                              )} />
                              <span className={cn(
                                "relative inline-flex h-1.5 w-1.5 rounded-full",
                                {
                                  "bg-green-500": initialData.status === "active",
                                  "bg-red-500": initialData.status === "archived",
                                  "bg-gray-500": initialData.status === "draft"
                                }
                              )} />
                            </span>
                            <span className="font-medium capitalize">
                              {initialData.status}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground overflow-hidden">
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="relative h-5 w-5 rounded-full overflow-hidden bg-muted">
                        <img 
                          src="https://avatars.githubusercontent.com/u/1" 
                          alt="Creator"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="hidden sm:inline">Created by</span>
                      <span className="truncate">{user?.fullName}</span>
                    </div>
                    <span className="hidden sm:inline">•</span>
                    <span className="truncate">Last updated {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Right Section: Actions */}
              <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
                {headerActions}
                <div className="mx-2 sm:mx-4 h-4 w-px bg-border" />
                <ShareModal 
                  title={productName || 'Untitled Product'}
                  url={window.location.href}
                  image={initialData?.images?.[0]?.url}
                >
                  <Button type="button" variant="outline" className="hidden sm:flex">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </ShareModal>
                <div className="hidden sm:block mx-4 h-4 w-px bg-border" />
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="hidden sm:flex">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" type="button" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hidden sm:flex">
                    <Heart className="h-4 w-4 text-muted-foreground" type="button" />
                  </Button>
                </div>
                <div className="mx-2 sm:mx-4 h-4 w-px bg-border" />
                <Button type="submit" onClick={(e) => {
                  e.preventDefault();
                  form.handleSubmit(handleSubmit)(e);
                }}>
                  Save
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="h-full">
              <div className="max-w-3xl mx-auto space-y-8 pl-0 pr-6 py-8 relative">
                <Tabs defaultValue="item-info" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="item-info">Item Info</TabsTrigger>
                    <TabsTrigger value="points-rewards">Points & Rewards</TabsTrigger>
                  </TabsList>
                  <TabsContent value="item-info" className="space-y-8">
                {/* Media Section */}
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <ImagePlus className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-medium">Media</h2>
                      <p className="text-sm text-muted-foreground">
                        Add photos of your product
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Media form={form} />
                  </CardContent>
                </Card>

                {/* Basic Details Section */}
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                      <ClipboardEdit className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-medium">Basic Details</h2>
                      <p className="text-sm text-muted-foreground">
                        Add the essential information about your product
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <BasicDetails form={form} />
                  </CardContent>
                </Card>

                {/* Event Details Section - Only show for event products */}
                {isEventProduct && <EventDetails form={form} />}

                {/* Pricing Section */}
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-medium">Pricing</h2>
                      <p className="text-sm text-muted-foreground">
                        Set your product's pricing information
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Pricing form={form} />
                  </CardContent>
                </Card>

                {/* Variations Section */}
                <Variations form={form} />

                {/* Inventory Section */}
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100">
                      <BarChart3 className="h-5 w-5 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-medium">Inventory</h2>
                      <p className="text-sm text-muted-foreground">
                        Manage your product's inventory
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Inventory form={form} />
                  </CardContent>
                </Card>

                {/* Shipping Section */}
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                      <Truck className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-medium">Shipping</h2>
                      <p className="text-sm text-muted-foreground">
                        Set up shipping details
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Shipping form={form} />
                  </CardContent>
                </Card>

                {/* Organization Section */}
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <Tags className="h-5 w-5 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-medium">Organization</h2>
                      <p className="text-sm text-muted-foreground">
                        Organize and categorize your product
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Organization form={form} />
                  </CardContent>
                </Card>

                {/* Sales Channels Section */}
                <Card className="cursor-pointer hover:bg-accent/5 rounded-[18px] card-shadow">
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                      <Share2 className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-medium">Sales Channels</h2>
                      <p className="text-sm text-muted-foreground">
                        Manage where your product is sold
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <SalesChannelsSection
                      activeChannels={form.watch('salesChannels') || []}
                      onChannelsChange={(channels) => form.setValue('salesChannels', channels)}
                    />
                  </CardContent>
                </Card>
                  </TabsContent>
                  <TabsContent value="points-rewards" className="space-y-8">
                    <PointsRewards form={form} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
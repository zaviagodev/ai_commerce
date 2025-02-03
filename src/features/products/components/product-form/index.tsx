import { useState, useRef, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScrollFade } from "@/components/ui/scroll-fade";
import {
  ImagePlus,
  ClipboardEdit,
  DollarSign,
  BarChart3,
  Tags,
  Share2,
  Gift,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ShareModal } from "@/components/share/share-modal";
import { ProductSchema } from "../../schemas/product-schema";
import { BasicDetails } from "./sections/basic-details";
import { Media } from "./sections/media";
import { Pricing } from "./sections/pricing";
import { Variations } from "./sections/variations";
import { Inventory } from "./sections/inventory";
import { Organization } from "./sections/organization";
import { EventSummary } from "../../../events/components/event-form/sections/event-summary";
import { Attendees } from "./sections/attendees";
import { useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { RewardDetails } from "./sections/reward-details";
import { useTranslation } from "@/lib/i18n/hooks";
import { StatusSelect } from "@/components/status-select";
import { z } from "zod";
import { EventDetails } from "@/features/events/components/event-form/sections/event-details";
import { Event } from "@/types/product";

type ProductFormData = z.infer<typeof ProductSchema>;

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => Promise<void>;
  headerActions?: React.ReactNode;
  enableDiscount?: boolean;
}

export function ProductForm({
  initialData,
  onSubmit,
  headerActions,
  enableDiscount = true,
}: ProductFormProps) {
  const { user } = useAuth();
  const location = useLocation();
  const t = useTranslation();
  const isEventProduct = location.pathname.startsWith("/dashboard/events");
  const isRewardProduct = location.pathname.startsWith(
    "/dashboard/reward-items",
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      variantOptions: initialData?.variantOptions || [],
      variants: initialData?.variants || [
        {
          name: "default",
          sku: "default",
          price: 0,
          compareAtPrice: 0,
          quantity: 0,
          options: [],
          status: "active",
          position: 0,
          pointsBasedPrice: 0,
        },
      ],
      images: initialData?.images || [],
      category: initialData?.category,
      price: initialData?.price || 0,
      compareAtPrice: initialData?.compareAtPrice,
      cost: initialData?.cost,
      sku: initialData?.sku || "",
      barcode: initialData?.barcode || "",
      trackQuantity: initialData?.trackQuantity || false,
      quantity: initialData?.quantity,
      weight: initialData?.weight || 0,
      weightUnit: initialData?.weightUnit || "kg",
      width: initialData?.width || 0,
      length: initialData?.length || 0,
      height: initialData?.height || 0,
      dimensionUnit: initialData?.dimensionUnit || "cm",
      isReward: initialData?.isReward || false,
      isGiftCard: initialData?.isGiftCard || false,
      tags: initialData?.tags || [],
      status: initialData?.status || "draft",
      ...initialData,
    },
  });

  const handleSubmit = async (data: ProductFormData) => {
    try {
      await onSubmit(form.getValues());
    } catch (error) {}
  };

  const productName = form.watch("name");
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
      form.setValue("name", editedName.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNameSubmit();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditedName(productName);
    }
  };

  const productStatuses = [
    {
      label: t.products.products.status.draft,
      badgeClassName: "!bg-gray-100 text-gray-700",
      value: "draft",
    },
    {
      label: t.products.products.status.active,
      badgeClassName: "!bg-green-100 text-green-700",
      value: "active",
    },
    {
      label: t.products.products.status.archived,
      badgeClassName: "!bg-red-100 text-red-700",
      value: "archived",
    },
  ];

  return (
    <div className="flex h-dvh flex-col">
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <motion.div
            className="flex items-center px-6 -mx-6 py-3 border-b sticky top-0 z-10 pt-14"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex flex-col w-full gap-4 md:flex-row md:items-center">
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
                          {productName || t.products.products.form.untitled}
                        </h1>
                        {initialData?.status && !isEditing && (
                          <Badge
                            variant="secondary"
                            className={cn("whitespace-nowrap gap-2", {
                              "!bg-green-100 text-green-700 dark:!bg-green-700 dark:text-green-200":
                                initialData.status === "active",
                              "!bg-red-100 text-red-700 dark:!bg-red-700 dark:text-red-200":
                                initialData.status === "archived",
                              "!bg-gray-100 text-gray-700 dark:!bg-gray-700 dark:text-gray-200":
                                initialData.status === "draft",
                            })}
                          >
                            <span className="relative flex h-1.5 w-1.5">
                              <span
                                className={cn(
                                  "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                                  {
                                    "!bg-green-400 dark:!bg-green-500":
                                      initialData.status === "active",
                                    "!bg-red-400 dark:!bg-red-500":
                                      initialData.status === "archived",
                                    "!bg-gray-400 dark:!bg-gray-500":
                                      initialData.status === "draft",
                                  },
                                )}
                              />
                              <span
                                className={cn(
                                  "relative inline-flex h-1.5 w-1.5 rounded-full",
                                  {
                                    "!bg-green-500 dark:!bg-green-400":
                                      initialData.status === "active",
                                    "!bg-red-500 dark:!bg-red-400":
                                      initialData.status === "archived",
                                    "!bg-gray-500 dark:!bg-gray-400":
                                      initialData.status === "draft",
                                  },
                                )}
                              />
                            </span>
                            <span className="capitalize">
                              {t.products.products.status[initialData.status]}
                            </span>
                          </Badge>
                        )}
                        {isRewardProduct && (
                          <Badge
                            variant="secondary"
                            className="bg-purple-100 text-purple-700 flex items-center gap-1.5"
                          >
                            <Gift className="h-3.5 w-3.5" />
                            Reward Item
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground overflow-hidden">
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="hidden sm:inline">
                        {t.products.products.form.created}
                      </span>
                      <span className="truncate">{user?.fullName}</span>
                    </div>
                    <span className="hidden sm:inline">•</span>
                    <span className="truncate">
                      {t.products.products.form.lastUpdated}{" "}
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Section: Actions */}
              <div
                className="flex items-center justify-end gap-2"
                onClick={(e) => e.preventDefault()}
              >
                {/* {productName && headerActions} */}
                {productName && <div className="mx-2 h-4 w-px bg-border" />}
                {/* <ShareModal
                  title={productName || `${t.products.products.form.untitled}`}
                  url={window.location.href}
                  image={initialData?.images?.[0]?.url}
                >
                  <Button type="button" variant="outline" className="flex">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </ShareModal>
                <div className="mx-2 h-4 w-px bg-border" /> */}
                <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    form.handleSubmit(handleSubmit)(e);
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="flex-1 overflow-y-auto move-top"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="h-full">
              <div className="max-w-4xl mx-auto space-y-8 pl-0 md:pr-6 py-8 relative">
                <Tabs defaultValue="item-info" className="w-full">
                  <div className="flex items-center justify-between mb-6">
                    <TabsList>
                      {/* {isEventProduct && (
                        <TabsTrigger value="event-summary">
                          {t.products.products.form.tabs.eventSummary}
                        </TabsTrigger>
                      )} */}
                      <TabsTrigger value="item-info">
                        {t.products.products.form.tabs.itemInfo}
                      </TabsTrigger>
                      {isEventProduct && (
                        <TabsTrigger value="attendees">
                          {t.products.products.form.tabs.attendees}
                        </TabsTrigger>
                      )}
                    </TabsList>
                    <StatusSelect
                      form={form}
                      options={productStatuses}
                      placeholder={
                        t.products.products.form.sections.organization
                          .selectStatus
                      }
                    />
                  </div>
                  {isEventProduct && (
                    <TabsContent value="event-summary" className="space-y-8">
                      <EventSummary form={form as any} />
                    </TabsContent>
                  )}
                  <TabsContent value="item-info" className="space-y-8">
                    {/* Media Section */}
                    <Card>
                      <CardHeader className="flex flex-row items-center gap-4 py-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                          <ImagePlus className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-lg font-semibold">
                            {t.products.products.form.sections.media.title}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {
                              t.products.products.form.sections.media
                                .description
                            }
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Media form={form} productId={initialData?.id} />
                      </CardContent>
                    </Card>

                    {/* Basic Details Section */}
                    <Card>
                      <CardHeader className="flex flex-row items-center gap-4 py-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                          <ClipboardEdit className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-lg font-semibold">
                            {
                              t.products.products.form.sections.basicDetails
                                .title
                            }
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {
                              t.products.products.form.sections.basicDetails
                                .description
                            }
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <BasicDetails form={form} />
                      </CardContent>
                    </Card>

                    {/* Event Details Section - Only show for event products */}
                    {isEventProduct && <EventDetails form={form} />}

                    {(isEventProduct || form.watch("isReward")) && (
                      <RewardDetails form={form} />
                    )}

                    {/* Pricing Section */}
                    {form.watch("variantOptions").length === 0 && (
                      <Card>
                        <CardHeader className="flex flex-row items-center gap-4 py-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                            <DollarSign className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-lg font-semibold">Pricing</h2>
                            <p className="text-sm text-muted-foreground">
                              {
                                t.products.products.form.sections.pricing
                                  .description
                              }
                            </p>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Pricing
                            form={form}
                            enableDiscount={enableDiscount}
                          />
                        </CardContent>
                      </Card>
                    )}
                    <Variations form={form} isEventProduct={isEventProduct} />
                    <Card>
                      <CardHeader className="flex flex-row items-center gap-4 py-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100">
                          <BarChart3 className="h-5 w-5 text-pink-600" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-lg font-semibold">
                            {t.products.products.form.sections.inventory.title}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {
                              t.products.products.form.sections.inventory
                                .description
                            }
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Inventory form={form} />
                      </CardContent>
                    </Card>

                    {/* Variations Section */}
                    {/* <Variations form={form} /> */}

                    {/* Shipping Section */}
                    {/* <Card>
                      <CardHeader className="flex flex-row items-center gap-4 py-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                          <Truck className="h-5 w-5 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-lg font-semibold">Shipping</h2>
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
                          <h2 className="text-lg font-semibold">
                            {
                              t.products.products.form.sections.organization
                                .title
                            }
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {
                              t.products.products.form.sections.organization
                                .description
                            }
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Organization form={form} />
                      </CardContent>
                    </Card>

                    {/* Sales Channels Section */}
                    {/* <Card className="rounded-[18px]">
                      <CardHeader className="flex flex-row items-center gap-4 py-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                          <Share2 className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-lg font-semibold">
                            {t.products.products.form.sections.salesChannels.title}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {t.products.products.form.sections.salesChannels.description}
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <SalesChannelsSection
                          activeChannels={form.watch('salesChannels') || []}
                          onChannelsChange={(channels) =>
                            form.setValue('salesChannels', channels)
                          }
                        />
                      </CardContent>
                    </Card> */}
                  </TabsContent>
                  {isEventProduct && (
                    <TabsContent value="attendees" className="space-y-8">
                      <Attendees form={form as any} />
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            </div>
          </motion.div>
        </motion.form>
      </Form>
    </div>
  );
}

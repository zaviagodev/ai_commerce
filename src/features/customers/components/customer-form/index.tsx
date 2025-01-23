import { useForm, UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserCircle, BadgeCheck } from "lucide-react";
import { CustomerSchema } from "../../schemas/customer-schema";
import { BasicDetails } from "./sections/basic-details";
import { Addresses } from "./sections/addresses";
import { Marketing } from "./sections/marketing";
import { Customer } from "@/types/customer";
import { ShareModal } from "@/components/share/share-modal";
import { Share2, MessageSquare, Heart, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomerFormProps {
  initialData?: Customer;
  onSubmit: (data: Customer) => Promise<void>;
}

export function CustomerForm({ initialData, onSubmit }: CustomerFormProps) {
  const form = useForm({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
      isVerified: false,
      acceptsMarketing: false,
      tags: [],
      addresses: [],
      ...initialData,
    },
  });

  const handleSubmit = async (data: Customer) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Failed to save customer:", error);
    }
  };

  const customerName = form.watch("firstName") + " " + form.watch("lastName");
  const addresses = form.watch("addresses") || [];
  const isVerified = form.watch("isVerified");

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(customerName);

  const handleStartEditing = () => {
    setIsEditing(true);
    setEditedName(customerName);
  };

  const handleNameSubmit = () => {
    if (editedName.trim()) {
      form.setValue("firstName", editedName.split(" ")[0] || "");
      form.setValue("lastName", editedName.split(" ").slice(1).join(" ") || "");
    }
    setIsEditing(false);
  };

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
            {/* Image Placeholder */}
            <div className="relative h-16 w-16 shrink-0 rounded-lg border bg-muted overflow-hidden mr-3">
              <div className="flex h-full w-full items-center justify-center">
                <UserCircle className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>

            {/* Title and Status */}
            <div className="flex-1 mr-3">
              <div className="flex items-center gap-2 mb-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onBlur={handleNameSubmit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleNameSubmit();
                      } else if (e.key === "Escape") {
                        setIsEditing(false);
                        setEditedName(customerName);
                      }
                    }}
                    className="text-2xl font-semibold tracking-tight bg-transparent border-none outline-none focus:ring-0 p-0 w-full h-[36px]"
                    autoFocus
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <h1
                      className="text-2xl font-semibold tracking-tight cursor-text h-[36px] flex items-center"
                      onClick={handleStartEditing}
                    >
                      {customerName === " " || customerName === ""
                        ? "Untitled Customer"
                        : customerName}
                    </h1>
                    {isVerified && (
                      <BadgeCheck className="h-5 w-5 text-blue-500 shrink-0" />
                    )}
                  </div>
                )}
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                {addresses.length > 0 &&
                addresses.find((a) => a.isDefault && a.type === "shipping") ? (
                  <>
                    <span>
                      {(() => {
                        const defaultAddress = addresses.find(
                          (a) => a.isDefault && a.type === "shipping",
                        );
                        return defaultAddress
                          ? `${defaultAddress.address1}, ${defaultAddress.city}, ${defaultAddress.state} ${defaultAddress.postalCode}`
                          : "";
                      })()}
                    </span>
                    <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full whitespace-pre">
                      Default shipping
                    </span>
                  </>
                ) : (
                  <span>No addresses added yet</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center">
              {/* <ShareModal
                title={customerName || "New Customer"}
                url={window.location.href}
              >
                <Button type="button" variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </ShareModal> */}
              {/* <div className="mx-4 h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div> 
              <div className="mx-2 h-4 w-px bg-border" /> */}
              <Button type="submit">Save customer</Button>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 overflow-y-auto move-top"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="h-full">
              <div className="max-w-4xl mx-auto space-y-8 pl-0 md:pr-6 py-8 relative">
                <BasicDetails form={form} />
                <Addresses form={form} />
                {/* <Marketing form={form} /> */}
              </div>
            </div>
          </motion.div>
        </motion.form>
      </Form>
    </div>
  );
}

import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Event } from "@/types/product";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/hooks";

interface EventDetailsProps {
  form: UseFormReturn<Event>;
}

export function EventDetails({ form }: EventDetailsProps) {
  const t = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center gap-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
            <Calendar className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-medium">{t.events.event.details.title}</h2>
            <p className="text-sm text-muted-foreground">
              {t.events.event.details.description}
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.events.event.details.fields.startDateTime}</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      value={
                        field.value
                          ? new Date(field.value).toISOString().slice(0, 16)
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.events.event.details.fields.endDateTime}</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      value={
                        field.value
                          ? new Date(field.value).toISOString().slice(0, 16)
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="venueName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.events.event.details.fields.venueName.label}</FormLabel>
                <FormControl>
                  <Input placeholder={t.events.event.details.fields.venueName.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="venueAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.events.event.details.fields.venueAddress.label}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t.events.event.details.fields.venueAddress.placeholder}
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t.events.event.details.fields.venueAddress.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="googleMapsLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.events.event.details.fields.googleMapsLink.label}</FormLabel>
                <FormControl>
                  <Input placeholder={t.events.event.details.fields.googleMapsLink.placeholder} {...field} />
                </FormControl>
                <FormDescription>
                  {t.events.event.details.fields.googleMapsLink.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="organizerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.events.event.details.fields.organizerName.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.events.event.details.fields.organizerName.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organizerContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.events.event.details.fields.organizerContact.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.events.event.details.fields.organizerContact.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

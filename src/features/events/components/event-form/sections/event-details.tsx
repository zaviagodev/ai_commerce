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
            <h2 className="text-lg font-medium">
              {t.events.event.eventDetails.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t.events.event.eventDetails.subtitle}
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
                  <FormLabel>
                    {t.events.event.eventDetails.startDateTime}
                  </FormLabel>
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
                  <FormLabel>
                    {t.events.event.eventDetails.endDateTime}
                  </FormLabel>
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
            name="attendancePoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t.events.event.eventDetails.attendancePoints.label}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder={
                      t.events.event.eventDetails.attendancePoints.placeholder
                    }
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10))
                    }
                  />
                </FormControl>
                <FormDescription>
                  {t.events.event.eventDetails.attendancePoints.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="venueName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t.events.event.eventDetails.venueName.label}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      t.events.event.eventDetails.venueName.placeholder
                    }
                    {...field}
                  />
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
                <FormLabel>
                  {t.events.event.eventDetails.venueAddress.label}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={
                      t.events.event.eventDetails.venueAddress.placeholder
                    }
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t.events.event.eventDetails.venueAddress.description}
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
                <FormLabel>
                  {t.events.event.eventDetails.googleMapsLink.label}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      t.events.event.eventDetails.googleMapsLink.placeholder
                    }
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t.events.event.eventDetails.googleMapsLink.description}
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
                  <FormLabel>
                    {t.events.event.eventDetails.organizerName.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        t.events.event.eventDetails.organizerName.placeholder
                      }
                      {...field}
                    />
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
                  <FormLabel>
                    {t.events.event.eventDetails.organizerContact.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        t.events.event.eventDetails.organizerContact.placeholder
                      }
                      {...field}
                    />
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

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  itemsDescription: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(200, { message: "Description must not exceed 200 characters." }),
  quantity: z.enum(["small-bag", "medium-bag", "large-box", "other"]),
  pickupAddress: z.string().min(5, {
    message: "Pickup address must be at least 5 characters.",
  }),
  pickupTime: z.string().min(3, {
    message: "Please suggest a pickup time.",
  }),
});

export function DonationRequestForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemsDescription: "",
      pickupAddress: "",
      pickupTime: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would send this data to your server.
    console.log(values);
    toast({
      title: "Request Submitted!",
      description: "Thank you for your donation. We will find a volunteer soon.",
    });
    form.reset();
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="font-headline">Donation Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="itemsDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description of Items</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Winter jackets for kids, assorted T-shirts..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Briefly describe the clothing items you are donating.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an estimated quantity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="small-bag">Small Bag</SelectItem>
                        <SelectItem value="medium-bag">Medium Bag</SelectItem>
                        <SelectItem value="large-box">Large Box</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How much are you donating?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pickupTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Pickup Time</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Weekday evenings" {...field} />
                    </FormControl>
                     <FormDescription>
                      Best time for a volunteer to pick up.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="pickupAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, Anytown, USA" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your full address for the pickup.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit Donation Request</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

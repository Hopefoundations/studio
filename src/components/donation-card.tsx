"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import type { DonationRequest } from "@/lib/types";
import { Clock, MapPin, Package, Shirt } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type DonationCardProps = {
  request: DonationRequest;
};

export function DonationCard({ request }: DonationCardProps) {
  const { toast } = useToast();

  const handleClaim = () => {
    // In a real app, this would trigger a server action to update the request status
    toast({
      title: "Pickup Claimed!",
      description: `You have claimed the donation from ${request.donorName}.`,
    });
  };

  const timeAgo = formatDistanceToNow(new Date(request.createdAt), {
    addSuffix: true,
  });

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-headline flex items-start gap-2">
          <Shirt className="w-6 h-6 mt-0.5 text-primary flex-shrink-0" />
          <span>{request.itemsDescription}</span>
        </CardTitle>
        <CardDescription>Posted by {request.donorName} {timeAgo}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <Separator />
        <div className="space-y-3 text-sm">
          <div className="flex items-start">
            <Package className="w-4 h-4 mr-3 mt-0.5 text-muted-foreground" />
            <span className="capitalize">
              Quantity: {request.quantity.replace("-", " ")}
            </span>
          </div>
          <div className="flex items-start">
            <MapPin className="w-4 h-4 mr-3 mt-0.5 text-muted-foreground" />
            <span>{request.pickupAddress}</span>
          </div>
          <div className="flex items-start">
            <Clock className="w-4 h-4 mr-3 mt-0.5 text-muted-foreground" />
            <span>{request.pickupTime}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleClaim}>
          Claim Pickup
        </Button>
      </CardFooter>
    </Card>
  );
}

import { DonationCard } from "@/components/donation-card";
import { mockDonationRequests } from "@/lib/data";
import { Truck } from "lucide-react";

export default function PickupsPage() {
  const availableRequests = mockDonationRequests.filter(
    (req) => req.status === "Pending"
  );

  return (
    <div className="container py-10">
      <div className="flex flex-col items-center mb-8">
        <Truck className="w-12 h-12 text-primary mb-4" />
        <h1 className="text-3xl font-bold font-headline mb-2 text-center">
          Available Pickups
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl">
          Here are the current donation requests waiting for a volunteer. Thank
          you for your help in making a difference!
        </p>
      </div>

      {availableRequests.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableRequests.map((request) => (
            <DonationCard key={request.id} request={request} />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-16">
          <p className="text-lg">No available pickups at the moment.</p>
          <p>Please check back later!</p>
        </div>
      )}
    </div>
  );
}

import { HistoryClient } from "@/components/history-client";
import { mockDonationRequests, mockUser } from "@/lib/data";
import { BookMarked } from "lucide-react";

export default async function HistoryPage() {
  // In a real app, you would fetch this data based on the logged-in user's ID
  const myDonations = mockDonationRequests.filter(
    (req) => req.donorId === mockUser.id
  );
  const myPickups = mockDonationRequests.filter(
    (req) => req.volunteerId === mockUser.id
  );
  const userRole = mockUser.role;

  return (
    <div className="container py-10">
      <div className="flex flex-col items-center mb-8">
        <BookMarked className="w-12 h-12 text-primary mb-4" />
        <h1 className="text-3xl font-bold font-headline mb-2 text-center">
          My History
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl">
          Track your donation requests and claimed pickups. Your contributions
          are making a real impact in the community.
        </p>
      </div>
      <HistoryClient
        myDonations={myDonations}
        myPickups={myPickups}
        userRole={userRole}
      />
    </div>
  );
}

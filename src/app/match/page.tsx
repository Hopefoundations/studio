import { VolunteerMatcher } from "@/components/volunteer-matcher";
import { mockDonationRequests, mockVolunteers } from "@/lib/data";
import { Sparkles } from "lucide-react";

export default function MatchPage() {
  const pendingRequests = mockDonationRequests.filter(
    (r) => r.status === "Pending"
  );
  const volunteers = mockVolunteers;

  return (
    <div className="container py-10">
      <div className="flex flex-col items-center mb-8">
        <Sparkles className="w-12 h-12 text-primary mb-4" />
        <h1 className="text-3xl font-bold font-headline mb-2 text-center">
          AI Volunteer Matcher
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl">
          Use our AI-powered tool to find the best volunteer for a pending
          donation request based on location and current workload.
        </p>
      </div>

      <VolunteerMatcher
        pendingRequests={pendingRequests}
        volunteers={volunteers}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DonationRequest, Volunteer } from "@/lib/types";
import { findVolunteerForRequest } from "@/app/actions";
import { Loader2, UserCheck } from "lucide-react";
import type { MatchVolunteersToRequestsOutput } from "@/ai/flows/match-volunteers-to-requests";

type VolunteerMatcherProps = {
  pendingRequests: DonationRequest[];
  volunteers: Volunteer[];
};

export function VolunteerMatcher({
  pendingRequests,
  volunteers,
}: VolunteerMatcherProps) {
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [matchResult, setMatchResult] =
    useState<MatchVolunteersToRequestsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMatch = async () => {
    if (!selectedRequestId) {
      setError("Please select a donation request.");
      return;
    }

    const request = pendingRequests.find((r) => r.id === selectedRequestId);
    if (!request) {
      setError("Selected request not found.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setMatchResult(null);

    const volunteerLocations = volunteers.reduce((acc, vol) => {
      acc[vol.id] = vol.location;
      return acc;
    }, {} as Record<string, string>);
    
    const volunteerOngoingPickups = volunteers.reduce((acc, vol) => {
        acc[vol.id] = vol.ongoingPickups;
        return acc;
    }, {} as Record<string, number>);

    const input = {
      requestId: request.id,
      requestLocation: request.pickupAddress,
      volunteerLocations,
      volunteerOngoingPickups,
    };

    const result = await findVolunteerForRequest(input);

    if (result.success && result.data) {
      setMatchResult(result.data);
    } else {
      setError(result.error || "An unknown error occurred.");
    }
    setIsLoading(false);
  };

  const matchedVolunteer = volunteers.find(v => v.id === matchResult?.volunteerId);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline">Find a Volunteer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Donation Request</label>
          <Select
            onValueChange={setSelectedRequestId}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a pending request..." />
            </SelectTrigger>
            <SelectContent>
              {pendingRequests.map((req) => (
                <SelectItem key={req.id} value={req.id}>
                  {req.itemsDescription} at {req.pickupAddress}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleMatch} disabled={isLoading || !selectedRequestId} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Finding Match..." : "Find Best Volunteer"}
        </Button>

        {error && <p className="text-sm text-destructive">{error}</p>}

        {matchResult && matchedVolunteer && (
          <div className="pt-4">
             <Card className="bg-secondary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-headline">
                        <UserCheck className="w-6 h-6 text-primary"/>
                        Best Match Found!
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm font-semibold text-muted-foreground">Volunteer</p>
                        <p className="text-lg font-bold">{matchedVolunteer.name}</p>
                    </div>
                     <div>
                        <p className="text-sm font-semibold text-muted-foreground">Reason</p>
                        <p className="italic">"{matchResult.reason}"</p>
                    </div>
                </CardContent>
             </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

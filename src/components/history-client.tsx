"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DonationRequest } from "@/lib/types";
import { format } from "date-fns";

type HistoryClientProps = {
  myDonations: DonationRequest[];
  myPickups: DonationRequest[];
  userRole: "donor" | "volunteer";
};

export function HistoryClient({
  myDonations,
  myPickups,
  userRole,
}: HistoryClientProps) {

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "MMM dd, yyyy");
  }

  return (
    <Tabs defaultValue={userRole === "donor" ? "donations" : "pickups"} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="donations">My Donations</TabsTrigger>
        <TabsTrigger value="pickups">My Pickups</TabsTrigger>
      </TabsList>
      <TabsContent value="donations">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead>Volunteer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myDonations.length > 0 ? (
                myDonations.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium max-w-xs truncate">{req.itemsDescription}</TableCell>
                    <TableCell>
                      <Badge variant={req.status === "Completed" ? "default" : "secondary"}>{req.status}</Badge>
                    </TableCell>
                    <TableCell>{formatDate(req.createdAt)}</TableCell>
                    <TableCell>{req.volunteerName || "Pending"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    You haven't made any donations yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
      <TabsContent value="pickups">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Claimed</TableHead>
                <TableHead>Donor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myPickups.length > 0 ? (
                myPickups.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium max-w-xs truncate">{req.itemsDescription}</TableCell>
                    <TableCell>
                      <Badge variant={req.status === "Completed" ? "default" : "secondary"}>{req.status}</Badge>
                    </TableCell>
                    <TableCell>{formatDate(req.createdAt)}</TableCell>
                    <TableCell>{req.donorName}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    You haven't claimed any pickups yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
}

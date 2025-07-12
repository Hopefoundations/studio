import type { DonationRequest, User, Volunteer } from "@/lib/types";
import { subDays } from "date-fns";

export const mockUser: User = {
  id: "user_1",
  name: "Alex Doe",
  role: "volunteer", // can be 'donor' or 'volunteer' to test different views
  email: "alex.doe@example.com",
};

export const mockVolunteers: Volunteer[] = [
  { id: "vol_1", name: "Bob Smith", location: "100 Pine St, Metroville", ongoingPickups: 1 },
  { id: "vol_2", name: "Charlie Brown", location: "200 Oak Ave, Metroville", ongoingPickups: 0 },
  { id: "vol_3", name: "Diana Prince", location: "300 Maple Rd, Star City", ongoingPickups: 2 },
];


export const mockDonationRequests: DonationRequest[] = [
  {
    id: "req_1",
    itemsDescription: "A box of winter jackets for children aged 5-10.",
    quantity: "large-box",
    pickupAddress: "123 Main St, Metroville",
    pickupTime: "Tomorrow, 2 PM - 4 PM",
    status: "Pending",
    donorName: "Jane Doe",
    donorId: "user_2",
    createdAt: subDays(new Date(), 1).toISOString(),
  },
  {
    id: "req_2",
    itemsDescription: "Two bags of assorted clothing for toddlers.",
    quantity: "medium-bag",
    pickupAddress: "456 Oak Ave, Metroville",
    pickupTime: "Today, 5 PM - 7 PM",
    status: "Pending",
    donorName: "John Public",
    donorId: "user_3",
    createdAt: subDays(new Date(), 2).toISOString(),
  },
  {
    id: "req_3",
    itemsDescription: "Summer clothes for teenagers.",
    quantity: "small-bag",
    pickupAddress: "789 Pine St, Metroville",
    pickupTime: "Flexible",
    status: "Claimed",
    donorName: "Sam Ray",
    donorId: "user_4",
    volunteerId: "vol_1",
    volunteerName: "Bob Smith",
    createdAt: subDays(new Date(), 3).toISOString(),
  },
  {
    id: "req_4",
    itemsDescription: "Baby clothes and blankets.",
    quantity: "medium-bag",
    pickupAddress: "321 Elm St, Star City",
    pickupTime: "This weekend",
    status: "Completed",
    donorName: "Peter Pan",
    donorId: "user_5",
    volunteerId: "vol_3",
    volunteerName: "Diana Prince",
    completedAt: subDays(new Date(), 5).toISOString(),
    createdAt: subDays(new Date(), 7).toISOString(),
  },
  {
    id: "req_5",
    itemsDescription: "My own donation of various clothes.",
    quantity: "large-box",
    pickupAddress: "My house address",
    pickupTime: "Saturday morning",
    status: "Completed",
    donorName: mockUser.name,
    donorId: mockUser.id,
    volunteerId: "vol_2",
    volunteerName: "Charlie Brown",
    completedAt: subDays(new Date(), 10).toISOString(),
    createdAt: subDays(new Date(), 12).toISOString(),
  },
   {
    id: "req_6",
    itemsDescription: "Shoes and socks for kids.",
    quantity: "small-bag",
    pickupAddress: "987 Cedar St, Metroville",
    pickupTime: "Any weekday evening",
    status: "Pending",
    donorName: "Bruce Wayne",
    donorId: "user_6",
    createdAt: subDays(new Date(), 1).toISOString(),
  },
  // A request claimed by our mockUser
  {
    id: "req_7",
    itemsDescription: "Sports attire for young athletes.",
    quantity: "medium-bag",
    pickupAddress: "555 Gotham Ave, Star City",
    pickupTime: "Friday afternoon",
    status: "Claimed",
    donorName: "Clark Kent",
    donorId: "user_7",
    volunteerId: mockUser.id,
    volunteerName: mockUser.name,
    createdAt: subDays(new Date(), 4).toISOString(),
  },
];

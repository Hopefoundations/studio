export type DonationRequest = {
  id: string;
  itemsDescription: string;
  quantity: 'small-bag' | 'medium-bag' | 'large-box' | 'other';
  pickupAddress: string;
  pickupTime: string;
  status: 'Pending' | 'Claimed' | 'Completed';
  donorName: string;
  donorId: string;
  volunteerId?: string;
  volunteerName?: string;
  completedAt?: string;
  createdAt: string;
};

export type Volunteer = {
  id: string;
  name: string;
  location: string;
  ongoingPickups: number;
};

export type User = {
    id: string;
    name: string;
    role: 'donor' | 'volunteer';
    email: string;
};

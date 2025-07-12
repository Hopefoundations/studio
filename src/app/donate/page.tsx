import { DonationRequestForm } from "@/components/donation-request-form";
import { HandHeart } from "lucide-react";

export default function DonatePage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center">
        <HandHeart className="w-12 h-12 text-primary mb-4" />
        <h1 className="text-3xl font-bold font-headline mb-2 text-center">
          Make a Donation
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-8">
          Thank you for your generosity. Please fill out the form below to
          schedule a pickup for your clothing donation. A volunteer will be
          matched with your request shortly.
        </p>

        <DonationRequestForm />
      </div>
    </div>
  );
}

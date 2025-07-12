import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HandHeart, Shirt, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-card">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Give Warmth, Give Hope
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Threads of Hope connects generous donors with dedicated
                  volunteers to bring clothing to children in need. Your small
                  act of kindness can make a world of difference.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/donate">Donate Clothes</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/pickups">Volunteer for Pickup</Link>
                </Button>
              </div>
            </div>
            <Image
              src="https://placehold.co/600x400.png"
              width="600"
              height="400"
              alt="Hero"
              data-ai-hint="donated clothes children"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                How It Works
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A simple, streamlined process to make donating clothes as easy
                as possible.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
            <Card>
              <CardHeader className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <Shirt className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline">
                  1. Request a Pickup
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Donors fill out a simple form with details about the clothes
                and preferred pickup time.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <HandHeart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline">
                  2. Volunteer Claims
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                A volunteer views the request and claims it, confirming they
                will handle the pickup.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline">
                  3. Delivery to Orphanage
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                The volunteer picks up the donation and delivers it directly to
                the orphanage, completing the circle of giving.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

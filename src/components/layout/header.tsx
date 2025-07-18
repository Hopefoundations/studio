import Link from "next/link";
import { MainNav } from "@/components/layout/main-nav";
import { UserNav } from "@/components/user-nav";
import { HandHeart } from "lucide-react";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Button asChild variant="ghost" className="p-0 h-auto">
            <Link href="/" className="flex items-center space-x-2">
              <HandHeart className="h-6 w-6 text-primary" />
              <span className="font-bold inline-block font-headline text-lg">
                Threads of Hope
              </span>
            </Link>
          </Button>
          <MainNav className="hidden md:flex" />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <UserNav />
        </div>
      </div>
    </header>
  );
}

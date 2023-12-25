"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-start space-y-3 overflow-hidden pt-[12rem]">
      <h1 className="font-display text-[400px] leading-[350px]">X</h1>
      {isLoading && <Spinner />}
      {!isAuthenticated && !isLoading && (
        <>
          <SignInButton mode="modal" redirectUrl="/documents">
            <Button className="rounded-sm font-mono text-2xl">
              TRY 0x54 FREE <ArrowRight className="ml-4" />
            </Button>
          </SignInButton>
        </>
      )}
      {isAuthenticated && !isLoading && (
        <>
          <Button variant="ghost" className="rounded-sm font-mono text-2xl" asChild={true}>
            <Link href="/documents">
              ENTER 0x54 <ArrowRight className="ml-4" />
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
        </>
      )}
      {/* <ModeToggle></ModeToggle> */}
    </main>
  );
}

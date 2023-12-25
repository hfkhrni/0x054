"use client";

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navigation from "./_components/navigation";

function MainLayoung({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center  dark:bg-char-400">
        <Spinner />
      </div>
    );
  }
  if (!isAuthenticated) {
    return redirect("/");
  }
  return (
    <div className="flex h-full dark:bg-char-400">
      <Navigation />
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

export default MainLayoung;

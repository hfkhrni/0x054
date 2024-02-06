"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Error() {
  const router = useRouter();
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 font-mono">
      <h2 className="text-lg">Something wrong happened</h2>
      <Button
        className="mt-2"
        onClick={() => router.push("/documents")}
      >
        Get back
      </Button>
    </div>
  );
}

export default Error;

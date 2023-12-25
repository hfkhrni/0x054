"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

function DocumentsPage() {
  const user = useUser();
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <p className="font-mono text-sm italic">lonesome empty, expanding void</p>
      <Button variant="default" className="font-mono text-base italic">
        + create a file +
      </Button>
    </div>
  );
}

export default DocumentsPage;

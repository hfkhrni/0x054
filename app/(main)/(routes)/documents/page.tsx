"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

import { useUser } from "@clerk/clerk-react";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";

function DocumentsPage() {
  const user = useUser();
  const create = useMutation(api.documents.create);

  function onCreate() {
    const promise = create({ title: "Untitled" });

    toast.promise(promise, {
      loading: "Creating a new file...",
      success: "file created",
      error: "Failed to create a file",
    });
  }
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <p className="font-mono text-sm italic">lonesome empty, expanding void</p>
      <Button variant="default" onClick={onCreate} className="font-mono text-base italic">
        + create a file +
      </Button>
    </div>
  );
}

export default DocumentsPage;

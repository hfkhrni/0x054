import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

function Banner({ documentId }: { documentId: Id<"documents"> }) {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restoreArchived);

  function onRestore() {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring...",
      success: "File restored",
      error: "Failed to restore",
    });
  }

  function onRemove() {
    const promise = remove({ id: documentId }).then(() => {
      router.push(`/documents/`);
    });
    toast.promise(promise, {
      loading: "Deleting...",
      success: "File deleted",
      error: "Failed to delete",
    });
  }

  return (
    <div className="flex w-full items-center justify-center gap-x-2 bg-b-accent p-2 text-center font-mono text-sm font-medium text-char-400">
      <p className="pr-2">This page is archived</p>
      <Button
        size="sm"
        variant="ghost"
        className="h-8 rounded-sm border"
        onClick={onRestore}
      >
        Restore
      </Button>
      <Button
        size="sm"
        className="h-8 rounded-sm border"
        variant="ghost"
        onClick={onRemove}
      >
        Delete
      </Button>
    </div>
  );
}

export default Banner;

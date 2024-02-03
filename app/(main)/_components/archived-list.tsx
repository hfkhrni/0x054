"use client";

import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Regex, Trash, Undo2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function ArchivedList() {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getArchived);
  const restore = useMutation(api.documents.restoreArchived);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");

  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  function onClick(documentId: string) {
    router.push(`/documents/${documentId}`);
  }

  function onRestore(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">,
  ) {
    event.stopPropagation();
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring...",
      success: "File restored",
      error: "Failed to restore",
    });
  }

  function onRemove(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">,
  ) {
    event.stopPropagation();
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting...",
      success: "File deleted",
      error: "Failed to delete",
    });
    if (params.documentId === documentId) {
      router.push(`/documents/`);
    }
  }

  if (!documents) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size={"sm"} />
      </div>
    );
  }

  return (
    <div className="font-mono text-sm">
      <div className="flex items-center gap-x-2 p-2">
        <Regex className="h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-7 bg-secondary placeholder:text-xs dark:bg-char-400"
          placeholder="find a file"
        />
      </div>
      <div className="mt-1 px-1 pb-1">
        <p className="hidden pb-2 text-center text-xs text-muted-foreground last:block">
          NO FILES FOUND
        </p>
        {filteredDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="flex w-full items-center justify-between rounded-sm text-sm text-muted-foreground hover:bg-primary/5"
          >
            <span className="truncate py-1 pl-2">{document.title}</span>
            <div className="flex items-center gap-x-1">
              <div
                onClick={(event) => onRestore(event, document._id)}
                role="button"
                className="mr-1 rounded-sm p-[1px] hover:bg-neutral-300 dark:hover:bg-char-300"
              >
                <Undo2 className="h-4 w-4" />
              </div>
              <div
                onClick={(event) => onRemove(event, document._id)}
                role="button"
                className="mr-1 rounded-sm p-[1px] hover:bg-neutral-300 dark:hover:bg-char-300"
              >
                <Trash className="h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArchivedList;

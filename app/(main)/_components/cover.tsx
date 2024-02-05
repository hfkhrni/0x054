"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useParams } from "next/navigation";

type CoverProps = {
  preview?: boolean;
  url?: string;
};
function Cover({ preview, url }: CoverProps) {
  const { edgestore } = useEdgeStore();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const params = useParams();
  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted",
      )}
    >
      {!!url && (
        <Image
          src={url}
          fill
          alt="cover"
          className="object-cover"
        />
      )}
      {url && !preview && (
        <div className="absolute bottom-5 right-5 flex items-center gap-x-2 font-mono text-sm text-muted-foreground opacity-0 group-hover:opacity-100">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="rounded-sm dark:bg-char-400"
            size="sm"
            variant="outline"
          >
            Change Image
          </Button>
          <Button
            onClick={async () => {
              if (url) {
                await edgestore.publicFiles.delete({
                  url: url,
                });
              }
              removeCoverImage({ id: params.documentId as Id<"documents"> });
            }}
            className="rounded-sm dark:bg-char-400"
            size="sm"
            variant="outline"
          >
            Delete Image
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cover;

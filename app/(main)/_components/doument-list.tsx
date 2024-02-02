"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Item from "./item";
import { cn } from "@/lib/utils";
import { Asterisk } from "lucide-react";

type DocumentListProps = {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
};

function DocumentList({
  parentDocumentId,
  level = 0,
  data,
}: DocumentListProps) {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prev) => {
      return {
        ...prev,
        [documentId]: !prev[documentId],
      };
    });
  };

  const documents = useQuery(api.documents.getDocuments, {
    parentDocument: parentDocumentId,
  });

  function onRedirect(documentId: string) {
    router.push(`/documents/${documentId}`);
  }

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }
  return (
    <>
      <p
        style={{ paddingLeft: level > 0 ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          "hidden text-sm font-mono font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden",
        )}
      >
        No files inside
      </p>
      {documents.map((doc) => {
        return (
          <div key={doc._id}>
            <Item
              id={doc._id}
              onClick={() => onRedirect(doc._id)}
              label={doc.title}
              icon={Asterisk}
              documentIcon={doc.icon}
              active={doc._id === params.documentId}
              level={level}
              onExpand={() => onExpand(doc._id)}
              expanded={expanded[doc._id]}
            ></Item>
            {expanded[doc._id] && (
              <DocumentList
                parentDocumentId={doc._id}
                level={level + 1}
              ></DocumentList>
            )}
          </div>
        );
      })}
    </>
  );
}

export default DocumentList;

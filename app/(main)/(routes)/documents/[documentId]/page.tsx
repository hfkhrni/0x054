"use client";

import Cover from "@/components/cover";
import Toolbar from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

type PageProps = {
  params: {
    documentId: Id<"documents">;
  };
};

function Page({ params }: PageProps) {
  const id = params.documentId;
  const document = useQuery(api.documents.getById, { documentId: id });

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl">
          <div className="space-y-4 pl-6 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div className="font-mono">Document not found</div>;
  }
  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl">
        <Toolbar initData={document} />
      </div>
    </div>
  );
}

export default Page;

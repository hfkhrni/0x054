"use client";

import Cover from "@/app/(main)/_components/cover";
import Toolbar from "@/app/(main)/_components/toolbar";
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
    return <div>loading</div>;
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

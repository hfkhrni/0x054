"use client";

import Cover from "@/components/cover";
import Toolbar from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

type PageProps = {
  params: {
    documentId: Id<"documents">;
  };
};

function Page({ params }: PageProps) {
  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/editor"), {
        ssr: false,
      }),
    [],
  );
  const id = params.documentId;
  const document = useQuery(api.documents.getById, { documentId: id });
  const update = useMutation(api.documents.update);

  function onChange(content: string) {
    update({ id: id, content });
  }

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
      <Cover
        preview
        url={document.coverImage}
      />
      <div className="mx-auto sm:ml-20 md:max-w-3xl lg:max-w-4xl">
        <Toolbar
          preview
          initData={document}
        />
        <Editor
          editable={false}
          onChange={onChange}
          initContent={document.content}
        />
      </div>
    </div>
  );
}

export default Page;

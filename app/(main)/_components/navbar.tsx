"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { getMaxListeners } from "events";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import Title from "./title";
import Banner from "./banner";
import Menu from "./menu";
import Publish from "./publish";

type NavbarProps = {
  isCollapsed: boolean | undefined;
  onResetWidth: () => void;
};
function Navbar({ isCollapsed, onResetWidth }: NavbarProps) {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (!document) {
    return (
      <>
        <nav className="flex w-full items-center justify-between bg-background px-3 py-2 dark:bg-char-400">
          <Title.Skeleton />
          <div className="flex items-center gap-x-2">
            <Menu.Skeleton />
          </div>
        </nav>
      </>
    );
  }

  if (document === null) {
    return <div>document not found</div>;
  }

  return (
    <>
      <nav className="flex w-full items-center gap-x-4 bg-background px-3 py-2 dark:bg-char-400">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex w-full items-center justify-between">
          <Title initData={document} />
          <div>
            <Publish initData={document} />
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
}

export default Navbar;

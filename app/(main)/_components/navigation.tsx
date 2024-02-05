"use client";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import {
  ArchiveX,
  ChevronLeft,
  MenuIcon,
  Plus,
  Regex,
  Sliders,
} from "lucide-react";
import { useMediaQuery } from "@react-hookz/web";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import UserItem from "./user-item";
import Item from "./item";
import DocumentList from "./doument-list";
import { toast } from "sonner";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import ArchivedList from "./archived-list";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import Navbar from "./navbar";

function Navigation() {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const search = useSearch();
  const settings = useSettings();
  const params = useParams();
  const create = useMutation(api.documents.create);

  const resetDuration: number = 150;

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [isMobile, pathname]);

  function collapse() {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");

      setTimeout(() => setIsResetting(false), resetDuration);
    }
  }

  function handleMouseDown(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(event: MouseEvent) {
    console.log("hi");
    if (!isResizingRef.current) return;

    let newWidth = event.clientX;
    if (newWidth < 240) {
      newWidth = 240;
    }
    if (newWidth > 480) {
      newWidth = 480;
    }

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px`);
    }
  }
  function handleMouseUp() {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }
  function resetWidth() {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)",
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100" : "240px");
      setTimeout(() => setIsResetting(false), resetDuration);
    }
  }

  function handleCreate() {
    const promise = create({ title: "Untitled" });
    toast.promise(promise, {
      loading: "Creating a new file...",
      success: "File created",
      error: "Failed to create a file",
    });
  }
  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar relative z-[99999] flex h-full w-60 flex-col overflow-y-auto border-r-[1px] bg-secondary group-hover/sidebar:border-r-0 dark:border-char-100 dark:bg-char-300",
          isResetting &&
            `transitiona-all ease-in-out duration-${resetDuration}`,
          isMobile && "w-0",
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "absolute right-2 top-3 h-5 w-5 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600",
            isMobile && "opacity-100",
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </div>
        <UserItem></UserItem>
        <Item
          label="New File"
          onClick={handleCreate}
          icon={Plus}
        ></Item>
        <Item
          label="Search"
          onClick={search.onOpen}
          icon={Regex}
          isSearch
        ></Item>
        <Item
          label="Settings"
          onClick={settings.onOpen}
          icon={Sliders}
        ></Item>
        <div className="mt-4">
          <DocumentList />
          <Popover>
            <PopoverTrigger className="mt-4 w-full">
              <Item
                label="Archived"
                icon={ArchiveX}
              />
            </PopoverTrigger>
            <PopoverContent
              side={isMobile ? "bottom" : "right"}
              className="w-72 rounded-sm bg-neutral-300/50 p-0 sm:ml-2 dark:bg-char-300"
            >
              <ArchivedList />
            </PopoverContent>
          </Popover>
        </div>
        <div></div>
        {!isMobile && (
          <div
            onMouseDown={handleMouseDown}
            onDoubleClick={resetWidth}
            className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100"
          ></div>
        )}
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && `transition-all ease-in-out duration-${resetDuration}`,
          isMobile && "left-0 w-full",
        )}
      >
        {!!params.documentId ? (
          <Navbar
            isCollapsed={isCollapsed}
            onResetWidth={resetWidth}
          />
        ) : (
          <nav className="w-full bg-transparent px-3 py-2">
            {isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
}

export default Navigation;

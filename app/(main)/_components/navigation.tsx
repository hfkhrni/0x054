"use client";
import { ElementRef, useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useMediaQuery } from "@react-hookz/web";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function Navigation() {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar relative z-[99999] flex h-full w-60 flex-col overflow-y-auto border-r-[1px] border-secondary bg-secondary group-hover/sidebar:border-r-0 dark:border-char-100 dark:bg-char-300",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div role="button" className={cn("absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600", isMobile && "opacity-100")}>
          <ChevronLeft className="h-6 w-6" />
        </div>
        <div>action items</div>
        <div className="mt-4">action items</div>
        <div className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100"></div>
      </aside>
    </>
  );
}

export default Navigation;

"use client";

import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { text } from "stream/consumers";

type ItemProps = {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  id?: Id<"documents">;
  active?: boolean;
  documentIcon?: string;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
};
export default function Item({
  label,
  onClick,
  icon: Icon,
  id,
  active,
  documentIcon,
  expanded,
  onExpand,
  level = 0,
  isSearch,
}: ItemProps) {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level > 0 ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group flex min-h-[28px] w-full items-center py-1 pr-3 font-mono text-sm font-medium text-muted-foreground hover:bg-primary/5",
        active && "bg-primary/5 text-primary",
      )}
    >
      {!!id && (
        <div
          role="button"
          onClick={() => {}}
          className="mr-1 h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-char-300"
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="mr-2 h-[18px] w-[18px] shrink-0">{documentIcon}</div>
      ) : (
        <Icon className="mr-2 h-[18px] w-[18px] shrink-0" />
      )}

      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground dark:bg-char-400">
          <span className="text-xs">CMD/CTRL+K</span>
        </kbd>
      )}
    </div>
  );
}

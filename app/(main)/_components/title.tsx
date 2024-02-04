import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRef, useState } from "react";

function Title({ initData }: { initData: Doc<"documents"> }) {
  const update = useMutation(api.documents.update);
  const [title, setTitle] = useState<string>(initData.title || "Untitled");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function input() {
    setIsEditing(() => true);
    setTitle(initData.title);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current?.value.length);
    }, 0);
  }

  function disableInput() {
    setIsEditing(() => false);
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    update({ id: initData._id, title: event.target.value || "Untitled" });
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      disableInput();
    }

    if (event.key === "Escape") {
      setTitle(initData.title);
      disableInput();
    }
  }

  return (
    <div className="flex items-center gap-x-1 font-mono">
      {!!initData.icon && <p>{initData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          className="h-7 border-none px-2 focus-visible:ring-transparent dark:bg-char-400"
          value={title}
          onClick={input}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={disableInput}
        />
      ) : (
        <Button
          onClick={input}
          variant="ghost"
          size="sm"
          className="h-auto p-1 font-normal"
        >
          <span className="truncate">{initData.title}</span>
        </Button>
      )}
    </div>
  );
}

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-6 w-20 rounded-sm" />;
};

export default Title;

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { ImageIcon } from "lucide-react";
import { useRef, ElementRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

type ToolbarProps = {
  initData: Doc<"documents">;
  preview?: boolean;
};
function Toolbar({ initData, preview }: ToolbarProps) {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initData.title);
  const coverImage = useCoverImage();
  const update = useMutation(api.documents.update);
  function input() {
    if (preview) return;
    setIsEditing(() => true);
    setValue(initData.title);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current?.value.length);
    }, 0);
  }

  function onInput(value: string) {
    setValue(value);
    update({ id: initData._id, title: value || "Untitled" });
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
    if (event.key === "Escape") {
      disableInput();
    }
  }

  function disableInput() {
    setIsEditing(() => false);
  }
  return (
    <div className="group relative pl-[54px]">
      {!!initData.icon && preview && (
        <p className="pt-6 text-6xl">{initData.icon}</p>
      )}
      <div className="flex items-center gap-x-1 py-4 font-mono opacity-0 group-hover:opacity-100">
        {!initData.coverImage && !preview && (
          <Button
            variant="outline"
            size="sm"
            onClick={coverImage.onOpen}
            className="text-xs text-muted-foreground"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Add Image
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          value={value}
          onChange={(e) => {
            onInput(e.target.value);
          }}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          className="resize-none break-words bg-transparent font-mono text-5xl font-bold text-char-400 outline-none dark:text-neutral-300"
        ></TextareaAutosize>
      ) : (
        <div
          onClick={input}
          className="break-words pb-3 font-mono text-5xl font-bold text-char-400 outline-none dark:text-neutral-300"
        >
          {initData.title}
        </div>
      )}
    </div>
  );
}

export default Toolbar;

"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import useOrigin from "@/hooks/use-origin";
import {} from "@radix-ui/react-popover";
import { useMutation } from "convex/react";
import { Globe, Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function Publish({ initData }: { initData: Doc<"documents"> }) {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);
  const [copied, setcopied] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const url = `${origin}/preview/documents/${initData._id}`;

  function onPublish() {
    setIsSubmitting(true);
    const promise = update({ id: initData._id, isPublished: true }).finally(
      () => {
        setIsSubmitting(false);
      },
    );
    toast.promise(promise, {
      loading: "Publishing...",
      success: "File published",
      error: "Failed to publish",
    });
  }

  function onUnpublish() {
    setIsSubmitting(true);
    const promise = update({ id: initData._id, isPublished: false }).finally(
      () => {
        setIsSubmitting(false);
      },
    );
    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "File unublished",
      error: "Failed to unpublish",
    });
  }

  function onCopy() {
    navigator.clipboard.writeText(url);
    setcopied(true);
    setTimeout(() => {
      setcopied(false);
    }, 1000);
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          className="h-8 rounded-sm font-mono dark:bg-neutral-300"
        >
          Publish
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-72 font-mono dark:bg-char-300"
        align="end"
        alignOffset={8}
        forceMount
      >
        {initData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="h-4 w-4 animate-pulse text-b-accent" />
              <p className="text-xs font-medium text-b-accent">
                This file is live on web.
              </p>
            </div>
            <div className="flex items-center">
              <input
                className="h-8 flex-1 truncate rounded-l-sm border bg-muted px-2 text-xs"
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-sm rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              size="sm"
              className="w-full text-xs"
              disabled={isSubmitting}
              onClick={onUnpublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="mb-4 text-sm">Publish this file</p>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="h-8 w-full rounded-sm dark:bg-neutral-300"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default Publish;

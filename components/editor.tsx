"use client";
import { useTheme } from "next-themes";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

import { useEdgeStore } from "@/lib/edgestore";

type EditorProps = {
  onChange: (value: string) => void;
  initContent?: string;
  editable?: boolean;
};
function Editor({ onChange, initContent, editable }: EditorProps) {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  async function handleUpload(file: File) {
    const res = await edgestore.publicFiles.upload({
      file,
    });
    return res.url;
  }
  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initContent ? JSON.parse(initContent) : undefined,
    onEditorContentChange: (editor) =>
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2)),
    uploadFile: handleUpload,
  });
  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
}

export default Editor;

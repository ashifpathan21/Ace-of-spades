import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
import "highlight.js/styles/github-dark.css";
import { Bold, Italic, Heading1, Heading2, List, Code2 } from "lucide-react";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const buttonBase =
    "flex items-center gap-1 px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100";
  const active = "bg-black text-white";

  return (
    <div className="flex gap-2 flex-wrap mb-4">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${buttonBase} ${editor.isActive("bold") ? active : ""}`}
      >
        <Bold size={16} /> Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${buttonBase} ${editor.isActive("italic") ? active : ""}`}
      >
        <Italic size={16} /> Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${buttonBase} ${editor.isActive("heading", { level: 1 }) ? active : ""}`}
      >
        <Heading1 size={16} /> H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${buttonBase} ${editor.isActive("heading", { level: 2 }) ? active : ""}`}
      >
        <Heading2 size={16} /> H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${buttonBase} ${editor.isActive("bulletList") ? active : ""}`}
      >
        <List size={16} /> Bullet
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${buttonBase} ${editor.isActive("codeBlock") ? active : ""}`}
      >
        <Code2 size={16} /> Code
      </button>
    </div>
  );
};

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        bulletList: false,
        listItem: false,
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc pl-6",
        },
      }),
      ListItem,
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class:
            "bg-zinc-800 text-white p-4 rounded text-sm overflow-x-auto font-mono",
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value]);

  return (
    <div className="rounded p-4 bg-white text-black shadow-md">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none min-h-[200px]  focus:outline-none"
      />
    </div>
  );
};

export default RichTextEditor;

"use client";

import React from "react";

import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  ConditionalContents,
  toolbarPlugin,
  ChangeCodeMirrorLanguage,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  imagePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  MDXEditorProps,
} from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";
import "./dark-editor.css";
import { basicDark } from "cm6-theme-basic-dark";
import { useTheme } from "next-themes";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface Props {
  value: string;
  fieldChange: (value: string) => void;
  editorRef: ForwardedRef<MDXEditorMethods> | (null & MDXEditorProps);
}

const Editor = ({ value, fieldChange, editorRef }: Props) => {
  const { resolvedTheme } = useTheme();

  const themeExtension = resolvedTheme === "dark" ? [basicDark] : [];

  return (
    <MDXEditor
      key={resolvedTheme}
      markdown={value}
      ref={editorRef}
      className="background-light800_dark200 light-border-2 markdown-editor dark-editor w-full border grid"
      onChange={fieldChange}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        imagePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            java: "java",
            css: "css",
            html: "html",
            js: "javascript",
            json: "json",
            python: "python",
            sql: "sql",
            ts: "typescript",
            bash: "bash",
            tsx: "TypeScript (React)",
            jsx: "JavaScript (React)",
            c: "c",
            cpp: "cpp",
            go: "go",
            xml: "xml",
            yaml: "yaml",
            "": "unspecified",
          },
          autoLoadLanguageSupport: true,
          codeMirrorExtensions: themeExtension,
        }),
        diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === "codeblock",
                  contents: () => <ChangeCodeMirrorLanguage />,
                },
                {
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <Separator />

                      <BoldItalicUnderlineToggles />
                      <Separator />

                      <ListsToggle />
                      <Separator />

                      <CreateLink />
                      <Separator />

                      <InsertImage />
                      <Separator />

                      <InsertTable />
                      <Separator />

                      <InsertThematicBreak />
                      <Separator />

                      <InsertCodeBlock />
                      <Separator />
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
      ]}
    />
  );
};

export default Editor;

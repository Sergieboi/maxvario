"use client";
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  BoldIcon,
  ItalicIcon,
  LinkSlashIcon,
  ListBulletIcon,
  NumberedListIcon,
  LinkIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";

import Link from "@tiptap/extension-link";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      console.error(e);
    }
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <ButtonGroup>
        <Button
          isIconOnly
          onPress={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          color={editor.isActive("bold") ? "primary" : "default"}
        >
          <BoldIcon className="size-5" />
        </Button>
        <Button
          isIconOnly
          onPress={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          color={editor.isActive("italic") ? "primary" : "default"}
        >
          <ItalicIcon className="size-5" />
        </Button>
        <Button
          onPress={() => {
            if (editor.isActive("link")) {
              editor.chain().focus().unsetLink().run();
            } else {
              setLink();
            }
          }}
          isIconOnly
          color={editor.isActive("link") ? "primary" : "default"}
        >
          {editor.isActive("link") ? (
            <LinkSlashIcon className="size-5" />
          ) : (
            <LinkIcon className="size-5" />
          )}
        </Button>
        <Button
          isIconOnly
          onPress={() => editor.chain().focus().setParagraph().run()}
          color={editor.isActive("paragraph") ? "primary" : "default"}
        >
          <Icon icon="carbon:paragraph" width="24" height="24" />
        </Button>
        <Button
          isIconOnly
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          color={
            editor.isActive("heading", { level: 2 }) ? "primary" : "default"
          }
        >
          <Icon icon="gravity-ui:heading-2" width="20" height="20" />
        </Button>

        <Button
          isIconOnly
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          color={
            editor.isActive("heading", { level: 3 }) ? "primary" : "default"
          }
        >
          <Icon icon="gravity-ui:heading-3" width="20" height="20" />
        </Button>
        <Button
          isIconOnly
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          color={
            editor.isActive("heading", { level: 4 }) ? "primary" : "default"
          }
        >
          <Icon icon="gravity-ui:heading-4" width="20" height="20" />
        </Button>

        <Button
          isIconOnly
          onPress={() => editor.chain().focus().toggleBulletList().run()}
          color={editor.isActive("bulletList") ? "primary" : "default"}
        >
          <ListBulletIcon className="size-5" />
        </Button>
        <Button
          isIconOnly
          onPress={() => editor.chain().focus().toggleOrderedList().run()}
          color={editor.isActive("orderedList") ? "primary" : "default"}
        >
          <NumberedListIcon className="size-5" />
        </Button>
        <Button
          isIconOnly
          className="hidden md:inline-flex"
          onPress={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <ArrowUturnLeftIcon className="size-5" />
        </Button>
        <Button
          isIconOnly
          className="hidden md:inline-flex"
          onPress={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <ArrowUturnRightIcon className="size-5" />
        </Button>
        <Button isIconOnly onPress={addImage}>
          <PhotoIcon className="size-5" />
        </Button>
      </ButtonGroup>
      <div className="button-group"></div>
    </div>
  );
};

type Props = {
  content: string;
  editable?: boolean;
  onUpdate?: (content: string) => void;
};

const EditorComponent: FC<Props> = ({ content, onUpdate, editable = true }) => {
  const t = useTranslations();
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) {
    return null;
  }
  return (
    <div className="relative leading-6">
      <EditorProvider
        onUpdate={({ editor }) => {
          const htmlContent = editor.getHTML();
          onUpdate?.(htmlContent);
        }}
        slotBefore={editable ? <MenuBar /> : undefined}
        editable={editable}
        editorContainerProps={{
          className: editable ? "editable-tiptap" : "readonly-tiptap",
        }}
        extensions={[
          Image,
          Link.configure({
            openOnClick: false,
            autolink: false,
            defaultProtocol: "https",
            protocols: ["https"],
          }),
          Color.configure({ types: [TextStyle.name, ListItem.name] }),
          TextStyle,
          StarterKit.configure({
            bulletList: {
              keepMarks: true,
              keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
            },
            orderedList: {
              keepMarks: true,
              keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
            },
          }),
        ]}
        content={content}
      >
        {content === "" && editable && (
          <div className="absolute left-1 top-16 text-gray-500">
            {t("common.typehere")}
          </div>
        )}
      </EditorProvider>
    </div>
  );
};

EditorComponent.displayName = "EditorComponent";

export default EditorComponent;

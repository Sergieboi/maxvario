"use client";
import EditorJS from "@editorjs/editorjs";
import { useEffect, useRef } from "react";
import { EDITOR_CONFIG } from "./config";
import { useTranslations } from "next-intl";

const Editor = ({ value, onChange, holder }) => {
  const ref = useRef();
  const t = useTranslations();

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_CONFIG,
        placeholder: t("editor.placeholder"),
        data: value,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        },
        i18n: {
          toolNames: {
            Hyperlink: t("editor.tools.hyperlink"),
          },
        },
      });

      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return (
    <div id={holder} className="bg-gray-100 py-8 px-0 rounded-xl shadow-sm" />
  );
};

export default Editor;

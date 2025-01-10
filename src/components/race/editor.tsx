"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import and use createReactEditorJS to create the component
const ReactEditorJS = dynamic(
  () =>
    import("react-editor-js").then((mod) => {
      const { createReactEditorJS } = mod;
      return createReactEditorJS(); // Call the function to get the component
    }),
  { ssr: false } // Disable SSR for the editor
);

const EditorPage = () => {
  const [editorReady, setEditorReady] = useState(false);

  useEffect(() => {
    setEditorReady(true); // Set editor to be ready after the client-side mount
  }, []);

  if (!editorReady) {
    return <div>Loading Editor...</div>; // Placeholder until the editor is ready
  }

  return (
    <div>
      <h1>EditorJS in Next.js</h1>
      <ReactEditorJS />{" "}
      {/* Now ReactEditorJS should be a valid React component */}
    </div>
  );
};

export default EditorPage;

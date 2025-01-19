"use client";
import { useEffect, useState } from "react";
import { InstagramEmbed } from "react-social-media-embed";

const InstagramBlock: React.FC<{ url: string }> = ({ url }) => {
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  if (!client) {
    return null;
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <InstagramEmbed url={url} width={328} captioned />
    </div>
  );
};

export default InstagramBlock;

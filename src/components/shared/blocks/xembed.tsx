"use client";
import { XEmbed } from "react-social-media-embed";

const XEmbedBlock: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <XEmbed url={url} width={328} />
    </div>
  );
};

export default XEmbedBlock;

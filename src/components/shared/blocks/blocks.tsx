import { Block } from "@/lib/types/misc";
import { FC, Fragment } from "react";
import ParagraphBlock from "./paragraph";
import MVImage from "./image";
import htmlParser from "./html-parser";
import YoutubeBlock from "./youtube";
import XEmbedBlock from "./xembed";
import InstagramBlock from "./instagram";

type Props = {
  blocks: Array<Block>;
};

const Blocks: FC<Props> = ({ blocks }) => {
  return (
    <Fragment key={blocks?.[0].blockName}>
      {blocks
        ?.filter(({ blockName }) => blockName !== null)
        .map((block, index) => {
          switch (block.blockName) {
            case "core/paragraph":
              return (
                <ParagraphBlock key={index} content={block.innerContent[0]} />
              );
            case "core/image":
              return <MVImage key={index} block={block} />;
            case "core/list":
              return (
                <ul key={index} className="list-disc list-inside">
                  <Blocks blocks={block.innerBlocks} />
                </ul>
              );
            case "core/embed":
              if (
                block.attrs?.type === "video" &&
                block.attrs?.providerNameSlug === "youtube"
              ) {
                return <YoutubeBlock key={index} url={block.attrs.url} />;
              } else if (
                block.attrs?.type === "rich" &&
                block.attrs?.providerNameSlug === "twitter"
              ) {
                return <XEmbedBlock url={block.attrs.url} />;
              } else {
                if (block.attrs.url.includes("instagram")) {
                  return <InstagramBlock url={block.attrs.url} />;
                }
              }
              break;
            case "core/heading":
              return <>{htmlParser(block.innerContent[0])}</>;
            case "core/list-item":
              return htmlParser(block.innerHTML);
            default:
              console.log("Block not found", block);
              return null;
          }
        })}
    </Fragment>
  );
};

export default Blocks;

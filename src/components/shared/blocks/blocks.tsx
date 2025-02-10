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
  if (!blocks || blocks.length === 0) {
    return null;
  }
  return (
    <Fragment>
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
                  <Blocks
                    blocks={block.innerBlocks}
                    key={`anotherloop-${index}`}
                  />
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
                return <XEmbedBlock key={index} url={block.attrs.url} />;
              } else {
                if (block.attrs.url.includes("instagram")) {
                  return <InstagramBlock key={index} url={block.attrs.url} />;
                }
              }
              break;
            case "core/heading":
              return (
                <Fragment key={index}>
                  {htmlParser(block.innerContent[0])}
                </Fragment>
              );
            case "core/list-item":
              return (
                <Fragment key={index}>{htmlParser(block.innerHTML)}</Fragment>
              );
            default:
              return null;
          }
        })}
    </Fragment>
  );
};

export default Blocks;

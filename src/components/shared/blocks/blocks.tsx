import { Block } from "@/lib/types/misc";
import { FC } from "react";
import ParagraphBlock from "./paragraph";
import MVImage from "./image";
import htmlParser from "./html-parser";

type Props = {
  blocks: Array<Block>;
};

const Blocks: FC<Props> = ({ blocks }) => {
  return (
    <>
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
                  {/* {block.innerBlocks.map((innerBlock, innerIndex) => (
                    <li key={innerIndex}>
                      {innerBlock.innerContent.join(" ")}
                    </li>
                  ))} */}
                </ul>
              );
            case "core/list-item":
              return htmlParser(block.innerHTML);
            default:
              return null;
          }
        })}
    </>
  );
};

export default Blocks;

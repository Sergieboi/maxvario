import { Block } from "@/lib/types/misc";
import { FC } from "react";
import htmlParser from "./html-parser";

type Props = {
  block: Block;
};

const MVImage: FC<Props> = ({ block }) => {
  return <figure>{htmlParser(block.innerContent[0])}</figure>;
};

export default MVImage;

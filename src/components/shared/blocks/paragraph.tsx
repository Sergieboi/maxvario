import { FC } from "react";
import htmlParser from "./html-parser";

type Props = {
  content: string;
};

const ParagraphBlock: FC<Props> = ({ content }) => {
  return <>{htmlParser(content)}</>;
};

export default ParagraphBlock;

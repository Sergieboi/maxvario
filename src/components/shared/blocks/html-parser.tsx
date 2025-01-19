import parse, { DOMNode, domToReact, Element } from "html-react-parser";
import Link from "next/link";
import { type ReactNode, JSX } from "react";

const linkParser = (a: Element): JSX.Element => {
  return (
    <Link
      href={{ pathname: a?.attribs?.href }}
      title={a?.attribs?.title ?? ""}
      className="text-primary font-medium"
    >
      {domToReact(a.children as Array<DOMNode>)}
    </Link>
  );
};

const figureParser = (figure: Element): JSX.Element => {
  return (
    <figure className="my-4">
      {domToReact(figure.children as Array<DOMNode>)}
    </figure>
  );
};

const htmlParser = (html: string): ReactNode => {
  return parse(html, {
    replace(domNode) {
      if (domNode instanceof Element) {
        switch (domNode.name) {
          case "a": {
            return linkParser(domNode);
          }
          case "figure": {
            return figureParser(domNode);
          }
          case "h2": {
            return (
              <h2 className="text-2xl font-semibold">
                {domToReact(domNode.children as Array<DOMNode>)}
              </h2>
            );
          }
        }
      }
    },
  });
};

export default htmlParser;

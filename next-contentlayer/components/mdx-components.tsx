import Image from "next/image";
import Button from "./Button";
import { useMDXComponent } from "next-contentlayer/hooks";

type MDXProps = {
  code: string;
};

export function MDXComponentInterface({ code }: MDXProps) {
  const Component = useMDXComponent(code);
  // passing in Image?
  return <Component components={{ Image, Button }} />;
}

import AccLayout from "@/components/account/layout";
import { ReactNode } from "react";

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AccLayout>{children}</AccLayout>;
}

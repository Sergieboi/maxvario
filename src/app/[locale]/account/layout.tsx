import AccLayout from "@/components/account/layout";
import { ReactNode } from "react";

export async function generateMetadata() {
  return {
    title: "Maxvario",
  };
}

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AccLayout>{children}</AccLayout>;
}

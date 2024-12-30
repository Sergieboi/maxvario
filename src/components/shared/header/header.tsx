'use client'
import { FC } from "react";
import Container from "../container";
import Link from "next/link";
import clsx from "clsx";
import HeaderActions from "./actions";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";

const Header: FC = () => {
    const pathname = usePathname();
  return (
    
    <header className={clsx("h-24 flex items-center fixed top-0 z-30 w-full text-white",  (pathname.length <= 3) ? "" : "bg-blue-900")}>
      <Container className="flex justify-between items-center py-4">
        <Link href="/" className="text-xl font-bold">
          Logo
        </Link>
        <div className="flex gap-4 items-center">
          <Navbar   />
          <div className="actions">
            <HeaderActions />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;

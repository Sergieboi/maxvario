"use client";
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
    <header
      className={clsx(
        "h-24 flex items-center fixed top-0 z-30 w-full text-white",
        pathname.length <= 3 ? "" : "bg-blue-900"
      )}
    >
      <Container className="flex justify-between items-center py-4">
        <Link href="/" className="text-xl font-bold">
          <svg
            width="62.012"
            height="50.682"
            viewBox="0 0 620.12 506.82"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 2"
          >
            <path
              fill="#FFFFFF"
              d="m0.31,505.49l252.58,-446.54l91.97,163.96l-8.68,13.71l-83.27,-144.33l-223.28,397.19l147.99,2.04l72.62,-136.65l61.96,98.63l112.65,-201.25l195.28,254.57l-186.61,0l-48.79,-81.28l4.82,-13.36l3.01,1.69l50.29,80.95l153.29,0l-169.27,-217.27l-115.33,209.96s-1.45,-2.27 -2.29,-3.74c-18.19,-31.83 -36.45,-63.8 -55.39,-95.19c-0.82,-1.36 0.21,-2.37 -2.94,-1.73l-62.67,118.63l-187.94,0l0,0.01z"
            />
            <path
              fill="#FFFFFF"
              d="m618.78,205.57l-4.63,-20.02c-58.22,-164.38 -291.07,-196.26 -437.61,-149.64c-77.72,24.72 -164.13,82.37 -174.91,169.66c-2.33,-0.35 -1.51,-7.02 -1.38,-8.72c5.77,-75.68 72.73,-133.31 137.78,-162.13c104.29,-46.2 238.82,-46.38 343.05,0c68.37,30.43 136.7,90.46 137.71,170.85l-0.01,0z"
            />
          </svg>
        </Link>
        <div className="flex gap-4 items-center">
          <Navbar />
          <div className="actions">
            <HeaderActions />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;

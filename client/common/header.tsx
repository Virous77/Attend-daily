"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { MoveLeft } from "lucide-react";

type HeaderProps = {
  name: string;
  children?: ReactNode;
  close?: () => void;
};

const Header: React.FC<HeaderProps> = ({ children, name, close }) => {
  const router = useRouter();
  return (
    <nav
      className=" fixed top-0 left-0 w-full py-4 px-3 bg-background flex items-center justify-between z-[100]"
      style={{ boxShadow: "var(--shadow)" }}
    >
      <MoveLeft
        size={20}
        cursor="pointer"
        onClick={() => {
          if (close) {
            close();
          } else {
            router.back();
          }
        }}
      />
      <h2 className="text-[16px]">{name}</h2>
      <span>{children}</span>
    </nav>
  );
};

export default Header;

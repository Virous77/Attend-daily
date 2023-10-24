"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Logo = () => {
  const pathName = usePathname();

  if (pathName !== "/") return null;
  return (
    <Link href="/">
      <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-blue-600">
        {" "}
        ChatX
      </p>
    </Link>
  );
};

export default Logo;

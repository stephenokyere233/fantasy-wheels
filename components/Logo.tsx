import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <h1 className="font-bold text-lg md:text-xl">
        Fantasy<span className="text-brand">Wheels</span>
      </h1>
    </Link>
  );
};

export default Logo;

import Link from "next/link";
import React, { FC } from "react";

const FooterCollection: FC<{ title: string; data: any[] }> = ({
  title,
  data,
}) => {
  return (
    <div>
      <h3 className="font-bold pb-3">{title}</h3>
      <div className="flex flex-col">
        {data.map((link) => {
          return (
            <Link key={link.name} href={link.link} className="opacity-80 pb-1">
              {link.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FooterCollection;

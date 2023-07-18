import React, { FC } from "react";
import FooterCollection from "./FooterCollection";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import Banner from "./Banner";
import { FOOTER_DATA } from "@/constants/routes";

const Footer: FC<{className?:string }> = ({className }) => {
  return (
    <>
      <footer className={`text-lg bg-[#222] py-20 bg-whitesmoke ${className}`}>
        <section className="grid px-4 md:grid-cols-2 lg:grid-cols-3">
          {FOOTER_DATA.map((collection) => {
            const { title, data } = collection;
            return <FooterCollection key={title} title={title} data={data} />;
          })}
        </section>
        <section  className="pt-8">
          <div className="flex justify-between items-center">
            <span>
              &copy; {new Date().getFullYear()} Fantasy Wheels
            </span>
            <div className="flex gap-3">
              <AiFillInstagram size={24} />
              <BsTwitter size={24} />
            </div>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;

// A simple modern landing page for a school management SaaS called "Manage" , should have about 4 sections (about, features, pricing)

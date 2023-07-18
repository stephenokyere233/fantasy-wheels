import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useStore } from "@/store";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {IoIosArrowRoundBack} from "react-icons/io"

const PostPage = () => {
  const selectedBlogData = useStore((state) => state.selectedBlogData);

  if (!selectedBlogData) return <div>Loading....</div>;
  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl px-4 my-10">
        <Link href="/" className="flex gap-2 items-center">
          <IoIosArrowRoundBack />
          <p>Back</p>
        </Link>
        <h1 className="text-brand my-4 font-extrabold text-4xl lg:text-[2.5em] text-center">
          {selectedBlogData.title}
        </h1>
        <Image
          src={selectedBlogData.image}
          alt="brand"
          className="rounded-lg lg:h-[600px] object-cover "
          width={1500}
          height={1500}
        />
        <div className="w-full border-b p-8 flex justify-end text-xl md:text-2xl">
          <span>{selectedBlogData.date}</span>
        </div>
        <p className="text-xl lg:text-2xl my-10 mb-20">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          ipsa et commodi? Atque in id assumenda officiis nam ipsa blanditiis
          sunt obcaecati ad doloremque architecto odio repudiandae illum,
          repellendus harum ex quae commodi quam rerum, veritatis earu.
          Veritatis, sint praesentium?
          <br />
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          ipsa et commodi? Atque in id assumenda officiis nam ipsa blanditiis
          sunt obcaecati ad doloremque architecto odio repudiandae illum,
          repellendus harum ex quae commodi quam rerum, veritatis earu.
          Veritatis, sint praesentium?
          <br />
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          ipsa et commodi? Atque in id assumenda officiis nam ipsa blanditiis
          sunt obcaecati ad doloremque architecto odio repudiandae illum,
          repellendus harum ex quae commodi quam rerum, veritatis earu.
          Veritatis, sint praesentium?
          <br />
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          ipsa et commodi? Atque in id assumenda officiis nam ipsa blanditiis
          sunt obcaecati ad doloremque architecto odio repudiandae illum,
          repellendus harum ex quae commodi quam rerum, veritatis earu.
          Veritatis, sint praesentium?
        </p>
      </div>
      <div className="text-white bg-[#222]">
        <Footer className="mx-auto max-w-[90rem]" />
      </div>
    </>
  );
};

export default PostPage;

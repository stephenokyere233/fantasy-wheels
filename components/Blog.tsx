import React from "react";
import Image from "next/image";
import { BLOGS } from "@/constants";
import { useStore } from "@/store";
import Link from "next/link";

const Blog = () => {
  const setSelectedBlogData = useStore((state) => state.setSelectedBlogData);
  return (
    <div className="max-w-[90rem] mx-auto mt-10 scroll-mt-[10em]" id="blog">
      <div className="text-center mb-6">
        <span className="text-brand font-bold">Blog & News</span>
        <h2 className="text-2xl font-bold">Our Blog Content</h2>
        <p>
          In our blog, we share our passion for all things automotive, from the
          latest industry news and trends to insightful articles on car culture
          and history. Join us as we explore the world of cars and share our
          knowledge and expertise with fellow enthusiasts.
        </p>
      </div>
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-20">
        {BLOGS.map((blogPost,index) => {
          const { title, date, frontMatter, blog, image } = blogPost;
          return (
            <div
              className="box"
              key={title}
              onClick={() =>
                setSelectedBlogData({
                  title,
                  date,
                  frontMatter,
                  blog,
                  image,
                })
              }
            >
              <Link href={`/blog/${index}`}>
                <Image src={image} alt="" width={300} height={300} />
                <span className="text-brand">{date}</span>
                <h3 className="font-bold text-xl">{title}</h3>
                <p>{frontMatter}</p>
                <button className="bg-brand p-2 px-4 rounded-md mt-2">
                  Read More
                </button>
              </Link>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Blog;

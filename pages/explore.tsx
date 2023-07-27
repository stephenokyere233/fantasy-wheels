import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CARS, SPARE_PARTS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Explore = () => {
  return (
    <div>
      <Header />
      <section className="mx-auto max-w-[90rem]">
        <h2 className="text-3xl font-bold my-4">Explore all our products</h2>

        <div className="grid grid-cols-2 gap-10">
          {CARS.map((car) => {
            return (
              <div key={car.path} className="relative">
                <Link href={`/cars/${car.path}`}>
                  <Image
                    src={car.image}
                    alt="brand"
                    className="rounded-lg object-cover"
                    width={500}
                    height={500}
                  />
                  <p className="absolute bg-white bottom-4 left-4 px-4 p-2 rounded-lg">
                    {car.brand}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
         <div className="grid grid-cols-2 gap-10 my-10">

        {SPARE_PARTS.map((part) => {
          const { name, price, image, path } = part;
          return (
            <div key={name} className="border bg-[#2221] p-4 rounded-lg w-[500px]">
              <Link href={`/spare_parts/${path}`}>
                <Image
                  src={image}
                  alt={name}
                  width={500}
                  height={500}
                  className=" bg-contain h-[250px] object-contain"
                />

                <div className=" p-2 px-4 flex flex-col gap-1 ">
                  <h2 className="text-xl font-bold capitalize">{name}</h2>
                  <p>{price}</p>
                  <span className="text-brand flex items-center">
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </span>
                  <button className="bg-brand px-4 p-2 rounded-md">
                    View Details
                  </button>
                </div>
              </Link>
            </div>
          );
        })}
        </div>
      </section>
      <div className="bg-[#222] text-white">
        <Footer className="mx-auto max-w-[90rem] " />
      </div>
    </div>
  );
};

export default Explore;

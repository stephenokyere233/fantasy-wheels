import { CARS } from "@/constants";
import { useStore } from "@/store";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";

const CarPage = () => {
  const selectedCarData = useStore((state) => state.selectedCarData);
  const setSelectedCarData = useStore((state) => state.setSelectedCarData);

  if (!selectedCarData) return <div>Loading....</div>;

  return (
    <div className="">
      <Header />
      <div className="mx-auto max-w-[90rem]">
        <Link href="/" className="flex gap-2 items-center">
          <IoIosArrowRoundBack />
          <p>Back</p>
        </Link>

      </div>
      <section className="flex flex-col lg:flex-row mx-auto max-w-[90rem] gap-20 px-4 my-20 ">
        <div>
          <Image
            src={selectedCarData.image}
            alt="brand"
            className="rounded-lg object-cover "
            width={500}
            height={500}
          />
        </div>
        <div className="lg:w-[50%] ">
          <h2 className="text-2xl text-brand font-bold">
            {/* {selectedCarData.name} */}
            Car Name
          </h2>
          <span className="flex text-xl gap-2">
            <h3 className="text-brand font-bold ">Brand:</h3>
            <p>{selectedCarData.brand}</p>
          </span>
          <p className="text-xl">{selectedCarData.description}</p>
          <div className="text-yellow-500 text-2xl flex my-2">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </div>
          <div className="flex gap-4 my-2">
            <button className="bg-brand px-4 p-3 rounded-md">Buy Now</button>
            <button className="bg-[#2221] px-4 p-3 rounded-md">Add Cart</button>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[90rem]">
        <h2 className="font-bold text-3xl text-brand text-center">
          Similar products
        </h2>

        <div className="grid px-4 gap-10 md:grid-cols-2 my-10 md:px-10">
          {CARS.map((car) => {
            const { brand, image, description } = car;
            return (
              <div
                key={brand}
                className="relative"
                onClick={() =>
                  setSelectedCarData({ brand, image, description })
                }
              >
                <Link href={`/cars/${brand}`}>
                  <Image
                    src={image}
                    alt="brand"
                    className="rounded-lg object-cover"
                    width={800}
                    height={800}
                  />
                  <p className="absolute bg-white bottom-4 left-4 px-4 p-2 rounded-lg">
                    {brand}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
      <div className="text-white bg-[#222]">
        <Footer className="mx-auto max-w-[90rem]" />
      </div>
    </div>
  );
};

export default CarPage;

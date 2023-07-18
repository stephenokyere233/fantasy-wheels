import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SPARE_PARTS } from "@/constants";
import { useStore } from "@/store";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";

const SparePartsPage = () => {
  const selectedPartData = useStore((state) => state.selectedPartData);
  const setSelectedPartData = useStore((state) => state.setSelectedPartData);

  if (!selectedPartData) return <div>Loading....</div>;

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
            src={selectedPartData.image}
            alt="brand"
            className="rounded-lg object-cover "
            width={500}
            height={500}
          />
        </div>
        <div className="lg:w-[50%] ">
          <h2 className="text-2xl text-brand font-bold capitalize">
            {selectedPartData.name}
          </h2>
          <span className="flex text-xl gap-2">
            <h3 className="text-brand font-bold ">Price:</h3>
            <p>{selectedPartData.price}</p>
          </span>
          <p className="text-xl">{selectedPartData.description}</p>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-20 ">
          {SPARE_PARTS.map((part) => {
            const { name, price, image } = part;
            return (
              <div
                key={name}
                className="border bg-[#2221] p-4 rounded-lg"
                onClick={() => setSelectedPartData(part)}
              >
                <Link href={`/spare_parts/${name}`}>
                  <Image
                    src={image}
                    alt={name}
                    width={200}
                    height={200}
                    className=" bg-contain h-[250px] object-contain"
                  />

                  <div className=" p-2 px-4 flex flex-col gap-1 ">
                    <h2 className="text-xl font-bold capitalize">{name}</h2>
                    <p>{price}</p>
                    <span className="text-brand flex items-center">
                      <AiFillStar />
                      <p>(5 Reviews)</p>
                    </span>
                    <div className="flex justify-between">
                      <button className="bg-brand px-4 p-2 rounded-md">
                        Buy Now
                      </button>
                      <button className=" px-4 p-2 rounded-md">
                        View Details
                      </button>
                    </div>
                  </div>
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

export default SparePartsPage;

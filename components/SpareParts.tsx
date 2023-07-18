import { SPARE_PARTS } from "@/constants";
import { useStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillStar } from "react-icons/ai";

const SpareParts = () => {
   const setSelectedPartData = useStore((state) => state.setSelectedPartData);
  return (
    <div className="max-w-[90rem] mx-auto scroll-mt-[10em]" id="parts">
      <div className="text-center mb-10">
        <span className="text-brand font-bold">What We Offer</span>
        <h2 className="text-2xl font-bold">Our Cars Are Always The Best</h2>
        <p>
          You Can Also Get The Best Auto Spare Parts For Your Car Right Here{" "}
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-20 ">
        {SPARE_PARTS.map((part) => {
          const { name, price, image} = part;
          return (
            <div key={name} className="border bg-[#2221] p-4 rounded-lg" onClick={()=>setSelectedPartData(part)}>
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
                  <button className=" px-4 p-2 rounded-md">View Details</button>
                </div>
              </div>
                </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpareParts;

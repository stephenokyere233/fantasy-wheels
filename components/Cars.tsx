import { CARS } from "@/constants";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/store";

const Cars = () => {
  const setSelectedCarData = useStore((state) => state.setSelectedCarData);
  return (
    <section className="max-w-[90rem] mx-auto scroll-mt-[10em]" id="cars">
      <div className="text-center">
        <span className="text-brand font-bold">All Cars</span>
        <h2 className="text-2xl font-bold">We have all types of cars</h2>
        <p className="text-xl">
          Every Car Brand And Model And Also Every Auto Spare Parts You Need Is
          Right Here <br />
          You&apos;ll Get Your Quality And Affordable Car At Your Comfort
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-10 md:grid-cols-2 my-10 md:px-10">
        {CARS.map((car) => {
          const { brand, image,description } = car;
          return (
            <div
              key={brand}
              className="relative"
              onClick={() => setSelectedCarData({ brand, image,description })}
            >
              <Link href={`/cars/${brand}`}>
                <Image
                  src={image}
                  alt="brand"
                  className="rounded-lg object-cover"
                  width={500}
                  height={500}
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
  );
};

export default Cars;

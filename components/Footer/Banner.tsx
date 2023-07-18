import React from 'react'

import {IoArrowForwardOutline} from "react-icons/io5"
import Link from 'next/link';

const Banner = () => {
  return (
    <section className="my-20 max-w-[90rem] mx-auto p-10 flex items-center justify-center rounded-lg bg-brand h-[500px] flex-col">
      <h2 className="font-bold lg:text-5xl text-3xl text-center pb-3">
        Take the leap with FantasyWheels!
        <br /> Find the best cars right here!
      </h2>
      <Link href="/" className="flex p-4">
        <button className="text-xl text-black px-10 flex items-center bg-white py-3 rounded-lg">
          Get Started <IoArrowForwardOutline />
        </button>
      </Link>
    </section>
  );
}

export default Banner

/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import Header from "@/components/Header";
import Cars from "@/components/Cars";
import Footer from "@/components/Footer";
import Banner from "@/components/Footer/Banner";
import SpareParts from "@/components/SpareParts";
import Blog from "@/components/Blog";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchItemsInDB } from "@/services/cart.service";
import { firebaseAuth } from "@/config/firebase.config";
import { useStore } from "@/store";
import { CartItem } from "@/interaces";
import { useRouter } from "next/router";

export default function Home() {
  const setCartItems = useStore((state) => state.setCartItems);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  async function fetchItemsInCart() {
    if (!firebaseAuth.currentUser) return;
    setLoading(true);
    await fetchItemsInDB()
      .then((result) => {
        console.log("fetch items result", result);
        setCartItems(
          result?.filter(
            (result) => result.uid === firebaseAuth.currentUser?.uid
          ) as CartItem[]
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchItemsInCart();
  }, [router,firebaseAuth.currentUser]);

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <Header />
      <main className="px-4">
        <section className="flex flex-col lg:flex-row items-center justify-center gap-16 max-w-[90rem] mx-auto ">
          <div className="flex flex-col gap-10">
            <h1 className="text-4xl lg:text-5xl leading-[1.2em] font-bold">
              We Have Everything <br />
              Your <span className="text-brand">Car</span> Needs
            </h1>
            <p>
              Welcome to our car website, your ultimate destination for all
              things automotive.
              <br />
              Whether you&apos;re a car enthusiast or simply looking for your
              next vehicle,
              <br />
              we provide a wealth of information and resources to help you make
              informed decisions.
              <br />
              From comprehensive reviews and comparisons to the latest news and
              trends,
              <br />
              we&apos;ve got you covered. Join us on a journeythrough the
              exciting world of cars.
            </p>
            <div>
              <Link href="/explore">
                <button className="bg-brand px-4 p-2 w-[200px] rounded-md">
                  Explore Now
                </button>
              </Link>
            </div>
          </div>
          <div>
            <Image
              src="/assets/Benz.png"
              width={1500}
              height={1000}
              alt={""}
              className="bg-cover object-cover"
            />
          </div>
        </section>
        <Cars />
        <section className="flex flex-col lg:flex-row items-center justify-center gap-16 max-w-[90rem] mx-auto ">
          <div className="">
            <Image
              src="/assets/Lambo.png"
              width={1000}
              height={1000}
              alt={""}
              className="bg-cover object-cover"
            />
          </div>
          <div
            className="flex flex-col gap-10 scroll-mt-[10em] lg:w-[50%]"
            id="about"
          >
            <span className="text-brand text-xl fotn-bold">About Us</span>
            <h1 className="text-4xl lg:text-5xlleading-[1.2em] font-bold">
              Cheap Prices With Quality Cars
            </h1>
            <p>
              Welcome to our car website, where we provide everything you need
              to know about the latest and greatest cars on the market. From
              in-depth reviews and comparisons to detailed specifications and
              pricing information, we&apos;ve got you covered. Our team of
              expert writers and car enthusiasts are dedicated to delivering the
              most accurate and informative content to help you make the best
              buying decision. So sit back, relax, and let us take you on a
              journey through the exciting world of cars.
            </p>
            <div>
              <button className="bg-brand px-4 p-2 w-[200px] rounded-md">
                Explore Now
              </button>
            </div>
          </div>
        </section>
        <SpareParts />
        <Blog />
        <Banner />
      </main>
      <div className="bg-[#222] text-white">
        <Footer className="mx-auto max-w-[90rem] " />
      </div>
    </>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import { CARS } from "@/constants";
import { useStore } from "@/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/router";
import { firebaseAuth, firestoreDB } from "@/config/firebase.config";
import toast from "react-hot-toast";
import { addToCartInDB } from "@/services/cart.service";
import { doc } from "firebase/firestore";

const CarPage = () => {
  const router = useRouter();
  const selectedCarData = useStore((state) => state.selectedCarData);
  const setSelectedCarData = useStore((state) => state.setSelectedCarData);
  const addToCart = useStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState<number>(1);
  const { carID } = router.query;

  const findCar = (path: string) => {
    const foundCar = CARS.find((car) => path === car.path);
    setSelectedCarData(foundCar);
  };

  const addItemToCart = (item: any) => {
    if (!firebaseAuth.currentUser?.uid) {
      toast.error("login to add");
      router.push("/login");
      return;
    }
    let docRef = doc(
      firestoreDB,
      `users/${firebaseAuth.currentUser?.uid}/cart/${item.id}`
    );
    const toastID = toast.loading("Adding Item to DB");
    addToCartInDB(
      { ...item, quantity, uid: firebaseAuth.currentUser?.uid },
      docRef
    )
      .then(async () => {
        addToCart({ ...item, quantity, uid: firebaseAuth.currentUser?.uid });
        toast.dismiss(toastID);
        toast.success(
          `${quantity}-${item.name}${quantity > 1 ? "'s" : ""} added to cart`
        );
      })
      .catch((error) => {
        toast.error("Couldn't add item to DB");
        console.error(error);
      });
  };

  const decrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
    else toast.error("min quantity 0");
  };

  useEffect(() => {
    findCar(carID as string);
    setQuantity(1);
  }, [carID]);

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
            {selectedCarData.name}
          </h2>
          <span className="flex text-xl gap-2">
            <h3 className="text-brand font-bold ">Brand:</h3>
            <p>{selectedCarData.brand}</p>
          </span>
          <span className="flex text-xl gap-2">
            <h3 className="text-brand font-bold ">Price:</h3>
            <p>${selectedCarData.price}</p>
          </span>
          <p className="text-xl">{selectedCarData.description}</p>
          <div className="text-yellow-500 text-2xl flex my-2">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </div>
          <section>
            <div className="flex items-center gap-2">
              <h3>Quantity:</h3>
              <p className="flex items-center gap-2">
                <span onClick={decrement} className={` cursor-pointer`}>
                  <AiOutlineMinus />
                </span>
                <span className="w-[50px] text-center outline-none">
                  {quantity}
                </span>
                <span
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className={` cursor-pointer`}
                >
                  <AiOutlinePlus />
                </span>
              </p>
            </div>
          </section>
          <div className="flex gap-4 my-2">
      
            <button
              className="bg-brand px-10 p-3 rounded-md"
              onClick={() => addItemToCart({ ...selectedCarData, quantity })}
            >
              Add Cart
            </button>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[90rem]">
        <h2 className="font-bold text-3xl text-brand text-center">
          Similar products
        </h2>

        <div className="grid px-4 gap-10 md:grid-cols-2 my-10 md:px-10">
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
      </section>
      <div className="text-white bg-[#222]">
        <Footer className="mx-auto max-w-[90rem]" />
      </div>
    </div>
  );
};

export default CarPage;

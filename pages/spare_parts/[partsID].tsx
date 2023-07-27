/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SPARE_PARTS } from "@/constants";
import { useStore } from "@/store";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { firebaseAuth, firestoreDB } from "@/config/firebase.config";
import { addToCartInDB } from "@/services/cart.service";
import { doc } from "firebase/firestore";

const SparePartsPage = () => {
  const router = useRouter();
  const selectedPartData = useStore((state) => state.selectedPartData);
  const setSelectedPartData = useStore((state) => state.setSelectedPartData);
  const cartItems = useStore((state) => state.cartItems);
  const addToCart = useStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState<number>(1);
  const { partsID } = router.query;

  const findCar = (path: string) => {
    const foundPart = SPARE_PARTS.find((car) => path === car.path);
    setSelectedPartData(foundPart);
    if (!foundPart) return;
    const itemInCart = cartItems.find((item) => item.id === foundPart.id);
    if (itemInCart) setQuantity(itemInCart.quantity);
    else setQuantity(1);
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

  useEffect(() => {
    findCar(partsID as string);
  }, [partsID]);

  const decrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
    else toast.error("min quantity 0");
  };

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
      <section className="flex flex-col lg:flex-row mx-auto max-w-[90rem] gap-6  px-4 my-20 ">
        <div>
          <Image
            src={selectedPartData.image}
            alt="brand"
            className="rounded-lg object-cover"
            width={500}
            height={500}
          />
        </div>
        <div className="lg:w-[50%] flex flex-col  ">
          <h2 className="text-2xl text-brand font-bold capitalize">
            {selectedPartData.name}
          </h2>
          <span className="flex text-xl gap-2">
            <h3 className="text-brand font-bold ">Price:</h3>
            <p>${selectedPartData.price}</p>
          </span>
          <p className="text-xl">{selectedPartData.description}</p>
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
                <input
                  value={quantity}
                  className="w-[50px] text-center outline-none"
                />
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
              onClick={() => addItemToCart({ ...selectedPartData, quantity })}
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-20 ">
          {SPARE_PARTS.map((part) => {
            const { name, price, image, path } = part;
            return (
              <div key={name} className="border bg-[#2221] p-4 rounded-lg">
                <Link href={`/spare_parts/${path}`}>
                  <Image
                    src={image}
                    alt={name}
                    width={200}
                    height={200}
                    className=" bg-contain h-[250px] object-contain w-full "
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
      <div className="text-white bg-[#222]">
        <Footer className="mx-auto max-w-[90rem]" />
      </div>
    </div>
  );
};

export default SparePartsPage;

/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useStore } from "@/store";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CartItemCard from "@/components/CartItem";
import { CartItem } from "@/interaces";
import { firebaseAuth } from "@/config/firebase.config";
import { fetchItemsInDB } from "@/services/cart.service";

const Null = () => {
  return (
    <div className="flex flex-col items-center justify-center text-xl gap-10 opacity-50 h-full">
      <Image
        src="/assets/null.png"
        alt=""
        className="object-cover w-[400px] h-[400px]"
        width={300}
        height={300}
      />
      <p className="capitalize opacity-50">No Items Yet</p>
    </div>
  );
};

const Cart = () => {
  const setCartItems = useStore((state) => state.setCartItems);
  const cartItems = useStore((state) => state.cartItems);
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
    if (cartItems.length < 1) fetchItemsInCart();
  }, []);

  const grandTotal = (array: CartItem[]) => {
    let total = 0;

    for (let i = 0; i < array.length; i++) {
      total += array[i].quantity * array[i].price;
    }
    return total;
  };
  const totalItems = (array: CartItem[]) => {
    let total = 0;

    for (let i = 0; i < array.length; i++) {
      total += array[i].quantity;
    }
    return total;
  };

  return (
    <>
      <Header />
      <div className="min-h-[70vh] mx-auto max-w-[90rem] p-6">
        <h2 className="mx-auto text-2xl text-center uppercase mb-4">
          Cart items
        </h2>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : Object.keys(cartItems).length > 0 ? (
            <>
              <section className="mb-10 flex flex-col gap-4">
                {cartItems.map((item) => {
                  return (
                    <div key={item.id}>
                      <CartItemCard item={item} />
                    </div>
                  );
                })}
              </section>
              <section className="flex gap-4 text-xl items-center">
                <div className="flex gap-1 ">
                  <b>Grand Total:</b>
                  <p>${grandTotal(cartItems)}</p>
                </div>
                <div className="flex gap-1">
                  <b>Total Items:</b>
                  <p>{cartItems.length}</p>
                </div>
                <div className="flex gap-1">
                  <b>Total Unit Items:</b>
                  <p>{totalItems(cartItems)}</p>
                </div>
                <button className="bg-brand px-4 py-2 rounded-md">Checkout</button>
              </section>
            </>
          ) : (
            <Null />
          )}
        </div>
      </div>
      <div className="bg-[#222] text-white">
        <Footer className="mx-auto max-w-[90rem] " />
      </div>
    </>
  );
};

export default Cart;

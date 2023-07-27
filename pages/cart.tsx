/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useStore } from "@/store";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CartItemCard from "@/components/CartItem";
import { CartItem } from "@/interaces";
import { firebaseAuth, firestoreDB } from "@/config/firebase.config";
import { fetchItemsInDB} from "@/services/cart.service";
import Checkout from "@/components/Checkout";
import { BiTrashAlt } from "react-icons/bi";
import { CollectionReference, collectionGroup} from "firebase/firestore";
import useClearCollection from "@/hooks/useClearCollection";

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
  const { clearItems } = useClearCollection();

  const resetCart = (array: CartItem[]) => {
    let newCart = [];
    for (let i = 0; i < array.length; i++) {
      newCart.push({
        price: array[i].api_id,
        quantity: array[i].quantity,
      });
    }
    return newCart;
  };


  const clearItemsInCart = () => {
    if (!firebaseAuth.currentUser) return;
    const cartRef = collectionGroup(firestoreDB, "cart");
    clearItems(cartRef as CollectionReference, firebaseAuth.currentUser.uid);
  };

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
        <div className="mx-auto mb-4 flex  justify-between">
          <h2 className="text-2xl font-bold text-center uppercase">
            Cart items
          </h2>
          {cartItems.length > 0 && (
            <span
              onClick={clearItemsInCart}
              className="flex bg-red-400 p-2 cursor-pointer px-4 items-center rounded-md"
            >
              <p>Clear Cart</p>
              <BiTrashAlt size={28} />
            </span>
          )}
        </div>
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
                <Checkout cart={resetCart(cartItems)} />
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

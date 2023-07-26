/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { firestoreDB, firebaseAuth } from "@/config/firebase.config";
import { removeFromCartInDB } from "@/services/cart.service";
import { useStore } from "@/store";
import axios from "axios";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCheck } from "react-icons/ai";

const Success = () => {
  const router = useRouter();

  const { session_id } = router.query;
  console.log(useRouter().query);
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const cartItems = useStore((state) => state.cartItems);
  const clearCart = useStore((state) => state.clearCart);

  const clearItemsInCart = async () => {
    const promises = cartItems.map((item) => {
      const docRef = doc(
        firestoreDB,
        `users/${firebaseAuth.currentUser?.uid}/cart/${item.id}`
      );
      return removeFromCartInDB(docRef);
    });
    console.log("promises",promises)

    const toastId = toast.loading("Clearing cart...");
    await Promise.all(promises)
      .then(() => {
        clearCart();
        toast.dismiss(toastId);
        toast.success("Cart Cleared");
      })
      .catch((err) => {
        console.error("Error clearing cart:", error);
        toast.error("Failed to clear cart");
      });
  };

  async function fetcher() {
    setLoading(true);
    try {
      const result = await axios.post(`/api/checkout_session/${session_id}`);
      await clearItemsInCart();
      setData(result.data);
      setError(false);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching checkout session:", error);
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session_id !== undefined) {
      fetcher();
    }
  }, [session_id]);

  return (
    <div className="flex flex-col h-screen">
      <div>
        <Header />
      </div>
      <div className="flex-1 justify-center items-center flex">
        {error ? (
          <div className="p-2 rounded-md bg-rose-100 text-rose-500 max-w-md mx-auto">
            <p className="text-lg">Sorry, something went wrong!</p>
          </div>
        ) : !data ? (
          <div className="p-2 rounded-md bg-gray-100 text-gray-500 max-w-md mx-auto">
            <p className="text-lg animate-pulse">Loading...</p>
          </div>
        ) : (
          <div className="p-10 rounded-md bg-gray-100 max-w-lg mx-auto">
            <h2 className="text-4xl font-semibold flex flex-col items-center space-x-1">
              <span className="p-4 bg-green-500 rounded-md font-bold">
                <AiOutlineCheck size={32} color="white" />
              </span>
              <span>Thanks for your order!</span>
            </h2>
            <p className="text-lg mt-3 text-center">
              Check your inbox for the receipt.
            </p>
          </div>
        )}
      </div>

      <div className="bg-[#222] text-white">
        <Footer className="mx-auto max-w-[90rem] " />
      </div>
    </div>
  );
};

export default Success;

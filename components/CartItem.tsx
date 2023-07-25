/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { HiMinus } from "react-icons/hi";
import { IoAdd } from "react-icons/io5";
import Image from "next/image";
import toast from "react-hot-toast";
import { useStore } from "@/store";
import { CartItem } from "@/interaces";
import { addToCartInDB, removeFromCartInDB } from "@/services/cart.service";
import { firebaseAuth, firestoreDB } from "@/config/firebase.config";
import { doc } from "firebase/firestore";

const CartItemCard: FC<{ item: CartItem }> = ({ item }) => {
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  const addToCart = useStore((state) => state.addToCart);
  const removeFromCart = useStore((state) => state.removeFromCart);

  useEffect(() => {
    setItemQuantity(item.quantity);
  }, []);
  const addItemToCart = (item: CartItem) => {
    let docRef = doc(
      firestoreDB,
      `users/${firebaseAuth.currentUser?.uid}/cart/${item.id}`
    );
    addToCartInDB(
      { ...item, quantity: item.quantity, uid: firebaseAuth.currentUser?.uid },
      docRef
    )
      .then(async () => {
        addToCart({
          ...item,
          quantity: item.quantity,
          uid: firebaseAuth.currentUser?.uid,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeItemFromCart = async (item: CartItem) => {
    if (!firebaseAuth.currentUser) return;
    let docRef = doc(firestoreDB, `users/${firebaseAuth.currentUser.uid}/cart/${item.id}`);
    const toastId=toast.loading("removing item")
    await removeFromCartInDB(docRef)
      .then(() => {
        removeFromCart(item.id);
        toast.dismiss(toastId)
        toast.success(`${item.name} sucessfully removed from cart`);
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss(toastId);
        toast.error("something went wrong,try again");
      });
  };

  const decrement = () => {
    if (itemQuantity > 1) {
      setItemQuantity((prev) => {
        addItemToCart({ ...item, quantity: prev - 1 });
        return prev - 1;
      });
      console.log("item_decrement", item);
    } else toast.error("min quantity 0");
  };

  const increment = () => {
    setItemQuantity((prev) => {
      addItemToCart({ ...item, quantity: prev + 1 });
      return prev + 1;
    });
    console.log("item_increment", item);
  };

  return (
    <div
      key={item.name}
      className="justify-between items-center flex border p-4 bg-[#b6b6b681] rounded-md relative"
    >
      <Image
        src={item.image}
        width={100}
        height={100}
        className="rounded-md object-cover w-[200px] h-[100px]"
        alt={item.name}
      />
      <h2>{item.name}</h2>
      <p>${item.price}</p>
      <p>{itemQuantity}</p>
      <div className="flex gap-2">
        <button
          onClick={decrement}
          className="p-2 bg-brand rounded-md w-10 h-10"
        >
          <HiMinus />
        </button>
        <button
          className="p-2 bg-brand rounded-md w-10 h-10"
          onClick={increment}
        >
          <IoAdd />
        </button>
      </div>
      <button
        onClick={() => removeItemFromCart(item)}
        className="absolute top-4 right-4"
      >
        <BiTrashAlt color="red" size={28} />
      </button>
      <div className="flex items-center gap-2">
        <span>Unit Total:</span>
        <p>${item.price * itemQuantity}</p>
      </div>
    </div>
  );
};

export default CartItemCard;

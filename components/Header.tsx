/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { useStore } from "@/store";
import Image from "next/image";
import { AiFillShopping, AiOutlineUser } from "react-icons/ai";
import { firebaseAuth } from "@/config/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "@/services/auth.service";
import { FiLogOut } from "react-icons/fi";
import { fetchItemsInDB } from "@/services/cart.service";
import router from "next/router";
import { CartItem } from "@/interaces";

const Header = () => {
  const authenticatedUser = useStore((state) => state.authenticatedUser);
  const setAuthenticatedUser = useStore((state) => state.setAuthenticatedUser);
  const setCartItems=useStore(state=>state.setCartItems)
  const cartItems = useStore((state) => state.cartItems);
    async function fetchItemsInCart() {
      if (!firebaseAuth.currentUser) return;
      await fetchItemsInDB()
        .then((result) => {
          console.log("fetch items result", result);
          setCartItems(
            result?.filter(
              (result) => result.uid === firebaseAuth.currentUser?.uid
            ) as CartItem[]
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }

    useEffect(() => {
      fetchItemsInCart();
    }, [firebaseAuth.currentUser,router]);

  React.useEffect(() => {
    listenForAuthStateChange();
  }, []);

  async function listenForAuthStateChange() {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user && user.email) {
        setAuthenticatedUser(user);
      } else console.log("logged out");
    });
  }
  return (
    <header className="flex max-w-[90rem] mx-auto justify-between sticky top-0 p-4 text-xl bg-white items-center z-[20] ">
      <Logo />
      <nav className="lg:flex gap-10 hidden ">
        <Link href="/">Home</Link>
        <Link href="/#cars">Cars</Link>
        <Link href="/#about">About</Link>
        <Link href="/#parts">Parts</Link>
      </nav>
      {firebaseAuth.currentUser?.uid && (
        <Link href="/cart" className="flex items-center gap-2">
          <p>Cart</p>
          <AiFillShopping />
          {cartItems && <p>{cartItems.length}</p>}
        </Link>
      )}
      {firebaseAuth.currentUser?.uid ? (
        <div>
          {firebaseAuth.currentUser?.photoURL ? (
            <div className="flex items-center gap-2">
              <Image
                alt=""
                className="w-[50px] h-[50px] rounded-full"
                src={firebaseAuth.currentUser?.photoURL}
                width={100}
                height={100}
              />
              <button onClick={signOut} title="logout">
                <FiLogOut color="red" />
              </button>
            </div>
          ) : (
            <div className="border rounded-lg items-center p-2 flex gap-2">
              <AiOutlineUser />
              <button onClick={signOut} title="logout">
                <FiLogOut color="red" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-4 text-lg">
          <Link href="/login">
            <button className="bg-brand px-4 p-2 rounded-md">Login</button>
          </Link>
          <Link href="/signup">
            <button className="bg-[#222] text-white px-4 p-2 rounded-md">
              Signup
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

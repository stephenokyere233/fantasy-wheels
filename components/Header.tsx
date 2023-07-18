/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { useStore } from "@/store";
import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";
import { firebaseAuth } from "@/config/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "@/services/auth.service";

const Header = () => {
  const authenticatedUser = useStore((state) => state.authenticatedUser);
  const setAuthenticatedUser = useStore((state) => state.setAuthenticatedUser);

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
        <Link href="/#blog">Blog</Link>
      </nav>
      {authenticatedUser ? (
        <div>
          {authenticatedUser.photoURL ? (
            <div>
              <Image alt="" className="w-[50px] h-[50px] rounded-full" src={authenticatedUser.photoURL} width={100} height={100} />
              <button onClick={signOut}>Logout</button>
            </div>
          ) : (
            <div className="border rounded-lg items-center p-2 flex">
              <AiOutlineUser />
              <button onClick={signOut}>Logout</button>
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

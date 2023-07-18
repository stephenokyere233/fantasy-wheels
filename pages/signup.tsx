import { firebaseAuth } from "@/config/firebase.config";
import { onAuthenticationSuccess } from "@/services/auth.service";
import Image from "next/image";
import { useStore } from "@/store";
import {
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import Link from "next/link";
const googleProvider = new GoogleAuthProvider();

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const setAuthenticatedUser = useStore((state) => state.setAuthenticatedUser);

  const registerUserWithEmailAndPassword = async () => {
    if (email !== "" && password !== "" && name !== "") {
      setLoading(true);
      try {
        const res = await createUserWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );
        onAuthenticationSuccess({
          ...res.user,
          displayName: name,
        });
        setLoading(false);
        setAuthenticatedUser({
          ...res.user,
          displayName: name,
        });
        router.push("/");
      } catch (error: any) {
        console.log(error);
        toast.error(`${error.message}`);
        setLoading(false);
      }
    } else {
      toast.error("All fields are required");
    }
  };

  const handleSignUpWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider)
      .then(async (result: UserCredential) => {
        onAuthenticationSuccess(result.user);
        setAuthenticatedUser(result.user)
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Header />
      <main className="h-screen w-full flex flex-col max-w-[90rem] mx-auto">
        <div className="flex flex-1 justify-center items-center">
          <div className="border p-10 rounded-xl">
            <h3 className="flex text-xl gap-2 mb-4 text-center">
              <span>Login into </span>
              <Logo />
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  className="p-3 rounded-lg bg-[#2221]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  className="p-3 rounded-lg bg-[#2221]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  className="p-3 rounded-lg bg-[#2221]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="flex gap-2 bg-brand w-full items-center justify-center p-2 rounded-lg mb-4"
                onClick={registerUserWithEmailAndPassword}
              >
                {loading ? "loading..." : " Sign up"}
              </button>
            </div>
            <div className="flex items-center justify-center">
              <hr className="w-[120px]" />
              <p>OR</p>
              <hr className="w-[120px]" />
            </div>
            <div className="controls">
              <button
                className="flex gap-2 bg-brand w-full items-center justify-center p-2 rounded-lg mb-4"
                onClick={handleSignUpWithGoogle}
              >
                <Image
                  width={50}
                  height={50}
                  className="w-[20px] h-[20px] "
                  src="/assets/google-svgrepo-com.svg"
                  alt=""
                />
                <p>Continue with google</p>
              </button>
              <span className="text-center">
                Have an account?<Link href="/login">Login</Link>
              </span>
            </div>
          </div>
        </div>
      </main>
      <div className="bg-[#222] text-white">
        <Footer className="mx-auto max-w-[90rem] " />
      </div>
    </>
  );
};

export default Signup;

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import { firebaseAuth } from "@/config/firebase.config";
import { onAuthenticationSuccess } from "@/services/auth.service";
import Link from "next/link";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleGoogleAuth = () => {
    signInWithPopup(firebaseAuth, googleProvider)
      .then(async (result: UserCredential) => {
        onAuthenticationSuccess(result.user);
           setLoading(false);
           router.push("/");
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/internal-error).") {
          toast.error("You might be having connection issues");
        } else {
          toast.error(error.message);
        }
        console.log(error.message);
      });
  };
  const handleEmailAndPasswordAuth = () => {
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(firebaseAuth, email, password)
        .then(async (result: UserCredential) => {
          onAuthenticationSuccess(result.user);
          setLoading(false);
          router.push("/")
        })
        .catch((error) => {
          if (error.message === "Firebase: Error (auth/internal-error).") {
            toast.error("You might be having connection issues");
          } else if (
            error.message === "Firebase: Error (auth/user-not-found)."
          ) {
            toast.error("User not found");
          } else {
            toast.error(error.message);
          }
          console.log(error.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setErrorMessage("One or more fields empty");
    }
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
              {
                errorMessage&& <p>{errorMessage}</p>
              }
              <button
                className="flex gap-2 bg-brand w-full items-center justify-center p-2 rounded-lg mb-4"
                onClick={handleEmailAndPasswordAuth}
              >
                {loading ? "loading..." : " Sign in"}
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
                onClick={handleGoogleAuth}
              >
                <Image
                  width={50}
                  height={50}
                  className="w-[20px] h-[20px] "
                  src="/assets/google-svgrepo-com.svg"
                  alt=""
                />
                <p> Continue with google</p>
              </button>
              <span className="text-center">
                Don&apos;t have an account?<Link href="/signup">Sign up</Link>
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

export default Login;

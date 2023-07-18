import { firebaseAuth, firestoreDB } from "@/config/firebase.config";
import { User } from "@/interaces";
import { UserCredential } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import toast from "react-hot-toast";

export async function onAuthenticationSuccess(
  firebaseUser: UserCredential["user"]
) {
  let docRef = doc(firestoreDB, `users/${firebaseUser.uid}`);
  let docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    if (!firebaseUser.email) return;

    let newUser: User = {
      email: firebaseUser.email,
      name: firebaseUser.displayName || firebaseUser.email,
      uid: firebaseUser.uid,
      photoURL: firebaseUser.photoURL || null,
      createdAt: Date.now(),
    };

    setDoc(doc(firestoreDB, `users/${firebaseUser.uid}`), newUser)
      .then(async () => {
        toast.success("Signed up successfully");
      })
      .catch(() => console.error("Couldn't add user"));
  } else toast.success("Welcome");
}

export async function signOut() {
  firebaseAuth
    .signOut()
    .then(() => {
      toast.success("Logged out successfully")
      window.location.href = "/"
    })
    .catch((error) => {
      console.log(error)
    })
}
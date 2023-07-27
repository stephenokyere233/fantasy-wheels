import { firebaseAuth, firestoreDB } from "@/config/firebase.config";
import { useStore } from "@/store";
import toast from "react-hot-toast";
import {
  CollectionReference,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";

const useClearCollection = () => {
  const clearCart = useStore((state) => state.clearCart);
  const clearItems = async (
    collectionRef: CollectionReference,
    uid: string
  ) => {
    const q = query(collectionRef, where("uid", "==", uid));
    const toastId = toast.loading("Clearing cart...");
    const docSnap = await getDocs(q);
    docSnap.docs.forEach(async (item) => {
      let docRef = doc(
        firestoreDB,
        `users/${firebaseAuth.currentUser?.uid}/cart/${item.id}`
      );
      await deleteDoc(docRef)
        .then(() => {
          console.log("deleted");
        })
        .catch((err) => {
          console.error(err);
        });
    });
    clearCart();
    toast.dismiss(toastId);
    toast.success("Cart Cleared");
  };

  return { clearItems };
};

export default useClearCollection;

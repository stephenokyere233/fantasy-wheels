import { firebaseAuth, firestoreDB } from "@/config/firebase.config";
import { CartItem } from "@/interaces";
import {
  DocumentReference,
  collectionGroup,
  deleteDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

export async function addToCartInDB(item: any, docRef: DocumentReference) {
  await setDoc(docRef, item)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function removeFromCartInDB(
  docRef: DocumentReference
) {
  await deleteDoc(docRef)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function fetchItemsInDB() {
  if (!firebaseAuth) return;
  let itemsInCart: CartItem[] = [];

  const cartRef = collectionGroup(firestoreDB, "cart");

  const docsSnap = await getDocs(cartRef);
  docsSnap.forEach((doc) => {
    itemsInCart.push(doc.data() as CartItem);
  });

  return itemsInCart;
}

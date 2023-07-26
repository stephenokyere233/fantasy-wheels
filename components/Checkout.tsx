import axios from "axios";
import { FC } from "react";
import toast from "react-hot-toast";
import getStripe from "@/lib/get-stripe";

const Checkout: FC<{ cart: { price: string; quantity: number }[] }> = ({
  cart,
}) => {
  const redirectToCheckout = async () => {
    const toastID=toast.loading("Redirecting to Checkout...")
    try {
      const {
        data: { id },
      } = await axios.post("/api/checkout_session", {
        items: cart,
      });

      const stripe = await getStripe();
      const result = await stripe.redirectToCheckout({
        sessionId: id,
      });
      toast.dismiss(toastID)
      if (result?.error) toast.error(result?.error.message as string);
    } catch (error) {
      console.log(error);
      toast.dismiss(toastID);

    }
  };
  return (
    <button
      onClick={redirectToCheckout}
      className="bg-brand px-4 py-2 rounded-md"
    >
      Checkout
    </button>
  );
};

export default Checkout;
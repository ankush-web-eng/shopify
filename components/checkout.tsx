import CheckoutProps from "@/components/layouts/checkoutProps";
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

type CheckoutProps = {
  params: {
    cost: number;
    shipping: number;
    discount: number;
    payable: number;
    total: number;
  };
};

export default function Checkout({ params }: CheckoutProps) {

  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const amount = params.total * 100

  const handleClick = async () => {
    setLoading(true);
    if (params.total == 0){
      router.push("/cart")
      return
    }

    const stripe = await stripePromise;

    const response = await axios.post('/api/create-checkout-session', { amount: amount.toString() }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const session = response.data;

    if (session.id) {
      const result = await stripe!.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="max-w-fit max-h-fit border p-2 rounded-xl shadow-md flex flex-col space-y-3">
      <h1 className="text-2xl text-start font-bold ">Order Summary</h1>
      <CheckoutProps params={params} />
      <button
        className={`px-4 py-2 bg-blue-500 text-white rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? 'Checkout' : 'Checkout'}
      </button>
    </div>
  );
}

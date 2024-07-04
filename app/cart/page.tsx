"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Checkout from "@/components/checkout";
import Navbar from "@/components/layouts/navbar";
import Product from "@/components/product";

interface Product {
  _id: string;
  product: string;
  price: number;
  stock: number;
  details: string;
  images: string[];
}

export default function Page() {
  const [cart, setCart] = useState<Product[] | null>([]);

  const { data: session } = useSession();
  const email = session?.user?.email;

  const getCart = useCallback(async () => {
    try {
      const response = await axios.get(`/api/cart/getcart/${email}`);
      setCart(response.data.data);
    } catch (error) {
      console.log("Error in fetching Cart", error);
    }
  }, [email])

  useEffect(() => {
    getCart();
  }, [getCart]);

  let total = 0;

  if (cart !== null) {
    for (let i of cart) {
      total += Number(i.price);
    }
  }

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex justify-evenly max-md:flex-col max-md:space-y-4 md:py-20 md:px-12 px-3 py-4">
        <div className="flex flex-col space-y-3 h-screen justify-evenly md:space-y-6 p-4">
          {cart &&
            cart.map((item, index) => <Product key={index} params={item} />)}
        </div>
        <div className="">
          <Checkout
            params={{
              cost: total,
              shipping: 0,
              discount: 0,
              payable: total,
              total,
            }}
          />
        </div>
      </div>
    </div>
  );
}
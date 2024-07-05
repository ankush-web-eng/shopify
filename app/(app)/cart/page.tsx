"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Checkout from "@/components/checkout";
import Navbar from "@/components/layouts/navbar";
import Product from "@/components/product";
import { redirect } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
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

  let total = 0;
  if (cart !== null) {
    for (let i of cart) {
      total += Number(i.price);
    }
  }

  useEffect(() => {
    getCart();
  }, [getCart]);

  useEffect(() => {
    if (cart == null) {
      toast({
        title: "Cart is Empty",
        description: "Please add some items to cart",
      });
      redirect("/items");
    }
  }, [cart, toast])

  return (
    <div className="min-h-screen bg-gray-100">
  <Navbar />
  <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-bold mb-8 pt-6 pb-2">Your Shopping Cart</h1>
    <div className="flex flex-col md:flex-row md:space-x-8">
      <div className="md:w-2/3 space-y-4 no-scrollbar overflow-hidden h-96 overflow-y-scroll">
        {cart && cart.length > 0 ? (
          cart.map((item, index) => <Product key={index} params={item} />)
        ) : (
          <p className="text-center p-4 bg-white rounded-lg shadow-md">Your cart is empty</p>
        )}
      </div>
      <div className="md:w-1/3 mt-6 md:mt-0">
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
</div>
  );
}
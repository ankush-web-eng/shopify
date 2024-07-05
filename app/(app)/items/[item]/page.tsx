"use client";

import axios from "axios";
import Image from "next/image";
import Navbar from "@/components/layouts/navbar";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Carousel } from "react-responsive-carousel";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";


import "react-responsive-carousel/lib/styles/carousel.min.css";
interface Product {
  _id: string;
  product: string;
  price: number;
  details: string;
  stock: string;
  images: string[];
}

export default function Page({ params }: { params: { item: String } }) {
  const id = params.item;

  const [product, setProduct] = useState<Product>();
  const [cart, setCart] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast()

  const { data: session } = useSession()
  const email = session?.user?.email

  const getProduct = useCallback(async () => {
    try {
      const response = await axios.get(`/api/product/getsingleproduct/${id}`);
      setProduct(response.data.data);
    } catch (error) {
      console.log("Error in Fetching product", error);
    }
  }, [id]);

  useEffect(() => {
    getProduct();
  }, [getProduct])

  const addToCart = async () => {
    if (!email) {
      toast({
        title: "Please login first!",
        variant: "destructive"
      })
      router.replace("/sign-in")
      return
    } else {
      setCart(true);
      try {
        const response = await axios.post("/api/product/addtocart", { email, id })
        if (response.status == 201) {
          toast({
            title: 'Success',
            description: response.data.message,
          });
          setCart(false)
          window.location.reload()
        }
      } catch (error) {
        toast({
          title: 'Failed',
          description: "An error occurred. Please try again.",
          variant: 'destructive',
        });
        setCart(false)
      }
    }
  }


  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="h-screen flex items-center justify-around">
        {product && product.images.length > 0 && (
          <Carousel showArrows showThumbs infiniteLoop autoPlay>
            {product.images.map((item: string, index: number) => (
              <Image fetchPriority="high" key={index} src={item} alt="" height={80} width={80} />
            ))}
          </Carousel>
        )}
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold">{" "}{product?.product}</h1>
          <p className="text-gray-500">{product?.details}</p>
          <div className="flex space-x-4 font-semibold"><p className="line-through text-red-500">Rs.{" "}{Number(product?.price) + 700}</p>
            <p className="">Rs.{" "}{product?.price}</p></div>
          <Button onClick={addToCart} variant={'default'}>{cart ? <span className="flex space-x-2 justify-center">Adding <Loader2 className="animate-spin" /></span> : "Add to Cart"}</Button>
          {/* <p className="">{product?.stock}</p> */}
        </div>
      </div>
    </div>
  );
}

"use client";
import Navbar from "@/components/layouts/navbar";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

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

  const getProduct = async () => {
    try {
      const response = await axios.get(`/api/product/getsingleproduct/${id}`);
      setProduct(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log("Error in Fetching product", error);
    }
  };

  useEffect(() => {
    getProduct();
  })

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
                <h1 className="text-3xl">{product?.product}</h1>
                <p className="text-gray-500">{product?.details}</p>
                <div className="flex space-x-4"><p className="line-through">Rs.{" "}{Number(product?.price) + 700}</p>
                <p className="">Rs.{" "}{product?.price}</p></div>
                {/* <p className="">{product?.stock}</p> */}
            </div>
        </div>
    </div>
);
}

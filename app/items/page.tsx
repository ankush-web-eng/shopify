"use client"

import Navbar from "@/components/layouts/navbar";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  product: string;
  price: number;
  details: string;
  stock: string;
  images: string[];
}


export default function Page() {

  const [products, setProducts] = useState<Product[]>();

  const getProducts = async () => {
    try {
      const response =await axios.get("/api/product/getproducts");
      setProducts(response.data.data);
    } catch (error) {
      console.log("Error in Fetching product", error);
    }
  }

  useEffect(() => {
    getProducts();
  })
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex h-screen items-center justify-evenly px-2 w-screen max-md:pt-20 max-md:flex-col max-md:space-y-8 ">
        {products && products.map((product, index) => (
          <Link key={index} href={`/items/${product._id}`}>
            <Image src={product.images[0]} alt={product.product} height={200} width={200} />
          </Link>
        ))}
        </div>
    </div>
  );
}
"use client"

import Navbar from "@/components/layouts/navbar";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex h-screen items-center justify-evenly px-2 w-screen max-md:pt-20 max-md:flex-col max-md:space-y-8 ">
          <Link href={`/items/${1}`}>
            <Image src="/t-shirt.png" alt="T-Shirt" height={200} width={200} className="hover:scale-x-125 hover:scale-y-125 ease-in-out duration-500"/>
          </Link>
          <Link href={`/items/${2}`}>
            <Image src="/t-shirt.png" alt="T-Shirt" height={200} width={200} className="hover:scale-x-125 hover:scale-y-125 ease-in-out duration-500"/>
          </Link>
          <Link href={`/items/${3}`}>
            <Image src="/t-shirt.png" alt="T-Shirt" height={200} width={200} className="hover:scale-x-125 hover:scale-y-125 ease-in-out duration-500"/>
          </Link>
        </div>
    </div>
  );
}
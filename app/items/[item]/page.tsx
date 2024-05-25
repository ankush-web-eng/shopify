"use client"
import Navbar from "@/components/layouts/navbar"
import Image from "next/image"

export default function Page({params}: {params: {item: Number}}){

    const id = params.item
    // console.log(id);

    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <div className="h-screen flex items-center justify-around">
            <Image src="/t-shirt.png" alt="T=Shirt" height={200} width={200}/>
            <div className="flex flex-col">
                <h1 className="text-2xl">Hi It is T-Shirt Number {String(id)}</h1>
            </div>
        </div>
        </div>
    )
}
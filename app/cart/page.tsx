"use client"

import Navbar from "@/components/layouts/navbar"
import Product from "@/components/product"
import { FormItem } from "@/components/ui/form"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

interface Product {
    _id:string
    product:string
    price:number
    stock:number
    details:string
    image:string[]
}

export default function Page () {

    const [cart,setCart] = useState([])
    const [data,setData] = useState<Product[]>()

    const {data:session} = useSession()
    const email = session?.user?.email

    const getCart = async() => {
        try {
            const response = await axios.get(`/api/cart/getcart/${email}`)
            setCart(response.data.data)
        } catch (error) {
            console.log("Error in fetching Cart",error);
        }
    }

    useEffect(() => {
        getCart()
    })

    return (
        <div className="h-screen">
            <Navbar />
            <div className="flex space-x-4 max-md:flex-col max-md:space-y-4">
            <div className="flex flex-col space-y-3 p-4">
                {cart.map((item,index) => <Product key={index} params={item}/>)}
            </div>
            <div className=""></div>
            </div>
        </div>
    )
}
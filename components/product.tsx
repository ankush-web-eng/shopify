import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"


interface Product {
    _id:string
    product:string
    price:number
    stock:number
    details:string
    images:string[]
}


export default function Product({params}: {params: Product}) {


    const deleteProduct = () => {
        try {
            alert("Available Soon")
        } catch (error) {
            alert("Error in removing Product");
            console.log("Error in removing Product",error);
        }
    }
    return (
        <Link href={`/items/${params._id}`} className="flex border-gray-400 border rounded-lg p-3 space-x-3">
            <Image src={params?.images[0]} alt={params.product} height={50} width={100} fetchPriority="high" className="border rounded-lg"/>
                <div className="felx flex-col space-y-2">
                <h1 className="text-2xl">{params.product}</h1>
                <p className="text-gray-500">{params.details}</p>
                <div className="flex space-x-4 font-semibold"><p className="line-through text-red-500">Rs.{" "}{Number(params.price) + 700}</p>   {"   "}Rs.{params.price}</div>
                <button onClick={deleteProduct} className="text-gray-500">Remove from Cart</button>
            </div>
        </Link>
    )
}
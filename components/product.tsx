import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteIcon, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

interface Product {
  _id: string;
  product: string;
  price: number;
  stock: number;
  details: string;
  images: string[];
}

export default function Product({ params }: { params: Product }) {
  const router = useRouter();
  const [send, setSend] = useState(false);
  const { data: session } = useSession();
  const email = session?.user?.email;

  const deleteProduct = async (id: string) => {
    try {
      setSend(true);
      const res = await axios.post("/api/product/deletefromcart", {
        id,
        email,
      });
      if (res.status === 201) {
        setSend(false);
        router.refresh();
      }
    } catch (error) {
      alert("Error in removing Product");
      console.log("Error in removing Product", error);
    }
  };

  return (
    <Link
      href={(window.location.pathname === '/cart') ?  `/items/${params._id}` : "#"}
      className="flex border-gray-400 border shadow-2xl rounded-lg p-6 space-x-3"
    >
      <Image
        src={params?.images[0]}
        alt={params.product}
        height={50}
        width={100}
        fetchPriority="high"
        className="border rounded-lg"
      />
      <div className="felx flex-col space-y-2">
        <h1 className="text-2xl">{params.product}</h1>
        <p className="text-gray-500">{params.details}</p>
        <div className="flex space-x-4 font-semibold">
          <p className="line-through text-red-500">
            Rs. {Number(params.price) + 700}
          </p>{" "}
          {"   "}Rs.{params.price}
        </div>
        <button
          onClick={() => deleteProduct(params._id)}
          className="text-gray-500"
        >
          {send ? (
            <Loader2 className="animate-spin" />
          ) : (
            <DeleteIcon size={26} />
          )}
        </button>
      </div>
    </Link>
  );
}

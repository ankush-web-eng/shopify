import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { MdDelete } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  product: string;
  price: number;
  stock: number;
  details: string;
  images: string[];
}

export default function Product({ params }: { params: Product }) {
  const [send, setSend] = useState(false);
  const { toast } = useToast()
  const router = useRouter()
  const { data: session } = useSession();
  const email = session?.user?.email;

  const deleteProduct = async (id: string) => {
    try {
      setSend(true);
      const res = await axios.post("/api/product/deletefromcart", {
        id,
        email,
      });
      setSend(false);
      toast({
        title: 'Success',
        description: "Item deleted from cart successfully",
      });
      window.location.reload()
    } catch (error) {
      toast({
        title: 'Failed to delete item from cart',
        description: "An error occurred. Please try again.",
      });
      setSend(false)
      window.location.reload()
    }
  };

  return (
    <Link
      href={(window.location.pathname === '/cart') ? "#" : `/items/${params._id}`}
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
        <div className="flex font-semibold">
          <p className="line-through mx-2 text-red-500">
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
            <MdDelete size={26} />
          )}
        </button>
      </div>
    </Link>
  );
}

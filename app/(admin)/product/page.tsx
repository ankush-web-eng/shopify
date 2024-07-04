import AddProduct from "@/components/upload/upload";
import { Metadata } from "next";

export const metadata : Metadata = {
  title : "Add Product"
}

export default function Page(){
  return <AddProduct />
}
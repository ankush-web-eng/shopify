
import { FaCartShopping } from "react-icons/fa6";
import Link from "next/link";
import ProfileUplaod from "../upload/profileUpload";
import Cartlength from "@/components/layouts/cartlength";

export default function Navbar() {

  return (
    <div className="flex fixed top-0 justify-between items-center pt-4 px-4 w-screen">
      <h1 className="font-mono italic text-2xl">Shopister</h1>
      <ul className="flex space-x-4 items-center">
        <ProfileUplaod />
        <Link href={"/cart"} className="relative">
          <FaCartShopping size={24} />
          <span className="absolute -right-[12px] -top-[12px] px-1 rounded-full bg-red-500">
            <Cartlength />
          </span>
        </Link>
      </ul>
    </div>
  );
}

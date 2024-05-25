import { useSession } from "next-auth/react";
import Image from "next/image"
import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";

export default function Navbar(){

    const [logged, setLogged] = useState<boolean>(false)
    
    const {data:session} = useSession()
    useEffect(() => {
        if(session){
            setLogged(true)
        }
    }, [session])

    return (
        <div className="flex justify-between items-center pt-4 px-4 w-screen">
            <h1 className="font-mono italic text-2xl">Shophilic</h1>
            <ul className="flex space-x-4 items-center">
                <Image src={logged ? session?.user?.image : "/user.png"} alt="User" width={28} height={28} className="rounded-full"/>
                <div className="relative">
                    <FaCartShopping size={24}/>
                    <span className="absolute -right-[12px] -top-[12px] px-1 rounded-full bg-red-500">2</span>
                </div>
            </ul>
        </div>
    )
}
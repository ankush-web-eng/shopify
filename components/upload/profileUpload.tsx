"use client"

import Image from "next/image"
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface User {
    name: string,
    email: string,
    image: string,
    password: string,
    isVerified: boolean,
    verifyCode: string,
    cart: [],
    orders: []
}

export default function ProfileUplaod() {

    const [logged, setLogged] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    const [send, setSend] = useState<boolean>(false);
    const [user, setUser] = useState<User>()

    const router = useRouter();
    const {toast} = useToast()
    const { data: session } = useSession();
    const email = session?.user?.email;

    useEffect(() => {
        if (session) {
            setLogged(true);
            setUser(session?.user)
        }
    }, [session]);

    const opening = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const UploadFile = async (e: any) => {
        e.preventDefault();
        if (!image || !email) return;

        const formdata = new FormData();
        formdata.append("email", email);
        formdata.append("file", image);

        if (image.size > 1 * 1048 * 1048){
            toast({
                title : "Failed",
                description : "Please upload a photo less than 1 mb",
                variant : "destructive"
            })
            return
        }

        setSend(true);

        try {
            const result = await axios.post("/api/upload", formdata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setSend(false);
            toast({
                title : "Success",
                description : "Photo uploaded Successfully",
                variant : "success"
            })
            window.location.reload()
        } catch (error) {
            console.log(error);
            setSend(false);
            toast({
                title : "Failed",
                description : "Photo upload failed",
                variant : "destructive"
            })
        }
    };

    return (
        <div className="relative cursor-pointer">
            <Image
                src={
                    logged
                        ? (user?.image ?? "/user.png")
                        : "/user.png"
                }
                alt={logged ? session?.user?.name : "User"}
                width={28}
                height={28}
                className="rounded-full peer"
                onClick={logged ? opening : () => router.push("/sign-in")}
            />
            {open && (
                <div className="absolute space-y-2 border right-0 py-4 px-2 shadow-xl rounded-xl flex flex-col">
                    <h1 className="text-center">Upload Profile Picture</h1>
                    <input
                        type="file"
                        name="Image"
                        placeholder="Profile Picture"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        required
                    />
                    <Button variant="secondary" onClick={UploadFile}>
                        {send ? (
                            <span className="flex">
                                Uploading <Loader2 className="animate-spin" />
                            </span>
                        ) : (
                            "Upload"
                        )}
                    </Button>
                    <Button variant={"destructive"} onClick={() => signOut()}>Logout</Button>
                </div>
            )}
        </div>
    )
}
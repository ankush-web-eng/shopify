"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push("/items")
    }, 2000);
  }, [router]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <h1 className="text-4xl font-mono italic">Hello Stranger, Welcome to Shopister</h1>
    </div>
  )
}
"use client"


import { useEffect } from "react"

export default function Home() {


  useEffect(() => {
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.location.href = "/items";
      }
    }, 2000);
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <h1 className="text-4xl font-mono italic">Hello Ankush</h1>
    </div>
  )
}
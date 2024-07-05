"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Cancel() {

  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.replace("/items")
    }, 2500);
  }, [router])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Payment Canceled</h1>
    </div>
  );
}

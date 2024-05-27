import Connect from "@/lib/dbConnect";
import ProductModel from "@/model/Products";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    Connect()
    try {
        const products = await ProductModel.find()
        
        const path = req.nextUrl.searchParams.get("path") || "/items"
        revalidatePath(path)

        return NextResponse.json({success:true,data:products})
    } catch (error) {
        return NextResponse.json({success:false,message:"Error fetching Products"}, {status: 500})
    }
}
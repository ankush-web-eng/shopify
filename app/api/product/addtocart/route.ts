import Connect from "@/lib/dbConnect";
import UserModel, { Cart } from "@/model/User";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    Connect()
    try {
        const reqBody = await req.json()
        const {email,id} = reqBody

        const user = await UserModel.findOne({email})
        if (!user) {
            return NextResponse.json({success:false,message:"User not Found"},{status:404})
        }

        user.cart.push({id} as Cart)
        await user.save()

        const path = req.nextUrl.searchParams.get('path') || `/items/${id}`
        revalidatePath(path)

        return NextResponse.json({success:true,message:"Product added to cart Successfully"}, {status:201})

    } catch (error) {
        console.log(error);
        return NextResponse.json({success:false,message:"Error in adding Product to Cart"},{status:500})
    }
}
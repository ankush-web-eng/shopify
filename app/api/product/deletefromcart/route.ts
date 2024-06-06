import Connect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    Connect()

    try {
        const reqBody = await req.json()
        const { id, email } = reqBody
        console.log(email, id);


        const user = await UserModel.findOne({ email })
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 })
        }

        console.log(user.cart);
        let flag = false
        
        for (let i of user.cart) {
            if (i.id == id) {
                user.cart.splice(user.cart.indexOf(i), 1)
                await user.save()
                break
            }
        }

        const path = req.nextUrl.searchParams.get("path") || "/cart"
        revalidatePath(path)
        if (flag) {
            return NextResponse.json({ success: true, message: "Product deleted from Cart" }, { status: 201 })
        } else {
            return NextResponse.json({ success: false, message: "Product not found in Cart" }, { status: 404 })
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error deleting Product" }, { status: 500 })
    }
}
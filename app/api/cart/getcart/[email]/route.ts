import Connect from "@/lib/dbConnect";
import ProductModel from "@/model/Products";
import UserModel from "@/model/User";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    params: {
        email: string
    }
}

export async function GET(req: NextRequest, context: Params) {
    const email = context.params.email
    // console.log(email);
    await Connect()
    try {
        const user = await UserModel.find({ email: email })
        if (!user || user.length === 0) {
            console.log("User Not Found");
            return NextResponse.json({ success: false, message: "User Not Found" }, { status: 404 })
        }

        const carts = user[0].cart
        if (!carts) {
            console.log("Cart Not Found");
            return NextResponse.json({ success: false, message: "Cart Not Found" }, { status: 404 })
        }

        const products = []
        
        for (let cart of carts) {
            const product = await ProductModel.findById(cart.id)
            products.push(product)
        }
        
        // const productIds = carts.map(cart => cart._id);
        // const products = await ProductModel.find({ _id: { $in: productIds } });
        
        const path = req.nextUrl.searchParams.get("path") || "/cart"
        revalidatePath(path)
        
        // console.log(products);
        // for(let i of carts){
        //     console.log(i.id);
        // }
        // console.log(carts.id);
        // console.log(user[0].username);

        return NextResponse.json({ success: true, data: products, messgage: "Cart fetched Successfully!" }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Error Loading Cart" }, { status: 500 })
    }
}
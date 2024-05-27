import Connect from "@/lib/dbConnect";
import ProductModel from "@/model/Products";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    params: {
        id: string
    }
}

export async function GET(req: NextRequest, context: Params) {
    const id = context.params.id
    // console.log(id);
    await Connect(); // Ensure the connection to the database is awaited

    try {
        const product = await ProductModel.findOne({ _id: id }); 

        if (!product) {
            console.log("Product not found");
            return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
        }

        const path = req.nextUrl.searchParams.get("path") || `/items/${id}`;
        revalidatePath(path);

        return NextResponse.json({ success: true, data: product });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Error fetching Product" }, { status: 500 });
    }
}

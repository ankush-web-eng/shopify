import Connect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function GET() {

    await Connect()
    const session = await getServerSession(authOptions)
    const email = session?.user?.email

    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            return NextResponse.json({ data: user })
        }
        else {
            return NextResponse.json({ success: false, message: "Please Login First" })
        }

    } catch (error) {
        return NextResponse.json({ success: false, message: "Unable to get UserData" })
    }
}
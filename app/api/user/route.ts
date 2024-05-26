import Connect from "@/lib/dbConnect";
import { useSession } from "next-auth/react";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {

    Connect()

    try {
        const reqBody = await req.json()
        const {email} = reqBody
        // console.log(reqBody);

        const user = await UserModel.findOne({ email })
        if (user) {
            return NextResponse.json({ data: user })
        }
        else {
            return NextResponse.json({ success: false, message: "Please Login First" })
        }

    } catch (error) {
        return NextResponse.json({ success: false, message: "Unabel to get UserData" })
    }
}
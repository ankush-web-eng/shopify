import Connect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import bcrypt from 'bcryptjs';
// import { sendVerificationEmail } from '@/helpers/sendVerificationMain';
import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  await Connect();

  try {
    const { username, email, password } = await request.json();

    const existingVerifiedUserByEmail = await UserModel.findOne({
      email,
      isVerified: true,
    });

    if (existingVerifiedUserByEmail) {
      return Response.json(
        {
          success: false,
          message: 'Already registered with this email. Please login.',
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: 'User already exists with this email',
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        isVerified: true,
        image: '',
        cart: [],
        orders: [],
      });

      await newUser.save();
    }

    // Send verification email
    // const emailResponse = await sendVerificationEmail(
    //   email,
    //   username,
    //   verifyCode
    // );
    // if (!emailResponse.success) {
    //   return Response.json(
    //     {
    //       success: false,
    //       message: emailResponse.message,
    //     },
    //     { status: 500 }
    //   );
    // }

    // const path = request.nextUrl.searchParams.get("path") || "/sign-up"
    // revalidatePath(path)

    return Response.json(
      {
        success: true,
        message: 'User registered successfully. Please verify your account.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return Response.json(
      {
        success: false,
        message: 'Error registering user',
      },
      { status: 500 }
    );
  }
}

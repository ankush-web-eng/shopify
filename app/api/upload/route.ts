import Connect from '@/lib/dbConnect';
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/model/User';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

Connect();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = formData.get('email');
    const file = formData.get('file') as File;

    if (!email || !file) {
      return NextResponse.json(
        { success: false, message: 'Email and file are required' },
        { status: 400 }
      );
    }

    // Convert file to a readable stream for Cloudinary upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);


    // Upload to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    if (!uploadResponse) {
      return NextResponse.json(
        { success: false, message: 'Error in Uploading Image' },
        { status: 400 }
      );
    }

    const url = uploadResponse.secure_url;

    // Update user profile with new image URL
    const user = await UserModel.findOne({ email });
    if (user) {
      user.image = url;
      await user.save();
    } else {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    console.log(uploadResponse,url);
    console.log(email, file);
    
    return NextResponse.json(
      { success: true, message: 'Image Uploaded Successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { success: false, message: 'Error in Uploading Image' },
      { status: 500 }
    );
  }
}

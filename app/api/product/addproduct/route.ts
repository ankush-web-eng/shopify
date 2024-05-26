import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import Connect from '@/lib/dbConnect';
import { ProductModel } from '@/model/Products';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function POST(req: NextRequest) {

    Connect()

    try {
        //Extract data from FormData
        const formdata = await req.formData()
        const name = formdata.get('productName')
        const stock = formdata.get('stock')
        const price = formdata.get('price')
        const details = formdata.get('details')
        const number = formdata.get('number')
        const images: File[] = []
        
        // Save images in Array
        for (let i = 0; i < Number(number); i++) {
            images.push(formdata.get(`images[${i}]`) as File)
        }

        const urls : string[] = []

        for (let image of images){
            //convert them to readable Cloudinary Format
            let arrayBuffer = await image.arrayBuffer()
            let buffer = new Uint8Array(arrayBuffer)

            //Upload to Cloudinary
            const uploadResponse = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                  { resource_type: 'auto' },
                  (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                  }
                ).end(buffer);
            });

            if (!uploadResponse){
                return NextResponse.json({success:false,message:"Error in Uploading Image"}, {status:500})
            }

            // Get the secure URLs to Upload on database
            urls.push((uploadResponse as {secure_url : string}).secure_url)
        }

        // Save product to DataBase
        const newProduct = new ProductModel({
            product : name,
            price,
            stock,
            details,
            images : urls
        })
        
        const isSaved = await newProduct.save()

        if (!isSaved) {
            return NextResponse.json({success:false,message:"Unable to Add Product"}, {status:500})
        }


        return NextResponse.json({ success: true, message: 'Product added successfully' });
    } catch (error) {
        console.error('Error parsing form:', error);
        return NextResponse.json({ success: false, message: 'Error adding product' }, { status: 500 });
    }
}


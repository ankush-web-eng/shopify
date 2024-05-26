import mongoose,{Schema,Document} from 'mongoose'

export interface Product extends Document {
    product:string
    price:number,
    stock:number,
    images:[],
    details:string,
}

const ProductSchema : Schema<Product> = new Schema({
    product:{
        type:String,
        required:true
    },
    price : {
        type:Number,
        required:true
    },
    stock: {
        type:Number,
        required:true
    },
    images:[],
    details: {
        type:String,
        required:true
    }
})

export const ProductModel = (mongoose.models.product as mongoose.Model<Product>) || mongoose.model<Product>('Product', ProductSchema)

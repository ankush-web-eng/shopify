import mongoose, {Document, Schema, model} from 'mongoose'

export interface Cart extends Document {
    id : string
}

const cartSchema : Schema<Cart> = new Schema({
    id: {type : String}
})
export interface Order extends Document {
    id : string
}

const orderSchema : Schema<Order> = new Schema({
    id: {type : String}
})

export interface User extends Document {
    username:string,
    email:string,
    password:string,
    isVerified:boolean,
    verifyCode:string,
    image:string,
    orders:[]
    cart:[]
}

const userSchema : Schema<User> = new Schema({
    username :{
        type:String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
    },
    password : {
        type : String,
        required : true
    },
    isVerified : { type: Boolean, default: false},
    verifyCode: {type: String, required: true },
    image : {type: String},
    cart : [cartSchema],
    orders : [orderSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', userSchema);

export default UserModel;
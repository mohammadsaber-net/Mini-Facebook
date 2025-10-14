import mongoose from "mongoose";

const connectionSechema=new mongoose.Schema({
    from_user_id:{
        type:String,
        ref:"user",
        required:true
    },
    to_user_id:{
        type:String,
        ref:"user",
        required:true
    },
    status:{
        type:String,
        enum:["pending","accepted"],
        default:"pending"
    },
},{timestamps:true})
export const Connection=mongoose.model("Connection",connectionSechema)
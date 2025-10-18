import mongoose from "mongoose";
const storyEschema=mongoose.Schema({
    user:{
        type:String,
        ref:"FaceUser",
        required:true
    },
    content:{
        type:String,
    },
    media_url:{
        type:String,
    },
    media_type:{
        type:String,
        enum:["text","image","text_with_image"],
        required:true
    },
    views_count:{
        type:String,
        ref:"FaceUser"
      },
      background_color: {
        type:String,
        required:true
      }
},{timestamps:true,minimize:false})
export const Story=mongoose.model("FaceStory", storyEschema)
import fs from "fs"
import {imagekit} from "../configs/imagekit.js"
import { Post } from "../model/posts.js"
import { FaceUser } from "../model/FaceUser.js"


export const addPost=async (req,res)=>{
    try {
        const {userId}=req.auth()
        const {content,post_type}=req.body
        let image_urls=[]
        const images=req.files || []
        if(images && images.length > 0){
            image_urls=await Promise.all(
                images.map(async(image)=>{
                    const buffer =await fs.promises.readFile(image.path)
                    const response=await imagekit.upload({
                        file:buffer,
                        fileName:image.originalname,
                        folder:"posts"
                    })
                    const url =imagekit.url({
                        path:response.filePath,
                        transformation:[
                            {quality:"auto"},
                            {format:"webp"},
                            {width:"1280"},
                        ]
                    })
                    try {
                        await fs.promises.unlink(image.path)
                    } catch (err) {
                        console.error("Failed to delete temp file:", err)
                    }
                    return url
                })
            )
        }
        await Post.create({
            user:userId,
            content,
            image_urls,
            post_type
        })
        res.status(201).json({
            success:true,
            message:"post created successfully"
        })
    } catch (error) {
         return res.status(500).json({
                success:false,
                message:error.message
            })
    }
}
export const getPosts=async(req,res)=>{
    try {
        const {userId}=req.auth()
        const user =await FaceUser.findById(userId)
        if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found or deleted"
        })
        }
        const userIds=[userId,...user.connections,...user.following]
        const posts=await Post.find({user:{$in:userIds}}).populate("user").sort({createdAt:-1})
        return res.status(200).json({
            success:true,
            posts
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


export const likePost=async(req,res)=>{
    try {
        const {userId}=req.auth()
        const {postId}=req.body
        const post=await Post.findById(postId)
        if(post.likes_count.include(userId)){
            post.likes_count=post.likes_count.filter(user=>user !== userId)
        }else{
            post.likes_count.push(userId)
            await post.save()
            return ({success:true,message:"post liked"})
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
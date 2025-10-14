// import {asyncWrapProvider} from "async_hooks"
import {imagekit} from "../configs/imagekit.js"
import fs from "fs"
import { FaceUser } from "../model/FaceUser.js"
export const getUserData=async(req,res)=>{
    try {
        const {userId}=req.auth()
        const user=await FaceUser.findById(userId)
        return res.status(200).json({
                success:true,
                data:user
            })
    } catch (error) {
        return res.status(500).json({
                success:false,
                data:null
            })
    }
}
//update data 
export const updateUserData=async(req,res)=>{
    try {
        const {userId}=req.auth()
        let {username,bio,location,full_name}=req.body
        const tempUser=await FaceUser.findById(userId)
        username = username || tempUser.username
        bio = bio || tempUser.bio
        location = location || tempUser.location
        full_name = full_name || tempUser.full_name
        if(username !== tempUser.username){
            const user=await FaceUser.findOne({username})
            if(user){
                return res.status(400).json({
                    success: false,
                    message: "Username already taken",
                })
            }
        }
        const updatedData={username,bio,location,full_name}
        const profile=req.files.profile && req.files.profile[0]
        const cover=req.files.cover && req.files.cover[0]
        if(profile){
            const buffer=fs.readFileSync(profile.path)
            const response=await imagekit.upload({
                file:buffer,
                fileName:profile.originalname,
            })
            const url=imagekit.url({
                path:response.filePath,
                transformation:[
                    {quality:"auto"},
                    {format:"webp"},
                    {width:"512"},
                ]
            })
            updatedData.profile_picture=url
        }
        if(cover){
            const buffer=fs.readFileSync(cover.path)
            const response=await imagekit.upload({
                file:buffer,
                fileName:cover.originalname,
            })
            const url=imagekit.url({
                path:response.filePath,
                transformation:[
                    {quality:"auto"},
                    {format:"webp"},
                    {width:"512"},
                ]
            })
            updatedData.cover_photo=url
        }
        const updating=await FaceUser.findByIdAndUpdate(userId,updatedData,{new:true})
        return res.status(200).json({
            success:true,
            user:updating
        })
    } catch (error) {
        return res.status(500).json({
                success:false,
                message:error.message,
            })
    }
}
export const discoverUsers=async(req,res)=>{
    try {
        const {userId}=req.auth()
        const {input}=req.body
    const allUsers=await FaceUser.find({
        $or:[
            {username:new RegExp(input,"i")},
            {email:new RegExp(input,"i")},
            {full_name:new RegExp(input,"i")},
            {location:new RegExp(input,"i")},
        ]
    })
    const filterAllUsers=allUsers.filter(user=>user._id !== userId)
    return res.status(200).json({
        success:true,
        users:filterAllUsers
    })
    } catch (error) {
       res.status(500).json({
        success:false,
        message:error.message
    }) 
    }
}
export const followUser=async(req,res)=>{
    try {
    const {userId}=req.auth()
    const {id}=req.body
    const user=await FaceUser.findById(userId)
    const toUser=await FaceUser.findById(id)
    if(user.following.includes(id)){
        return res.status(404).json({
            success:false,
            message:"you are already following "+toUser.username,
        })
    }
    user.following.push(id)
    toUser.followers.push(userId)
    await user.save()
    await toUser.save()
    res.status(200).json({
        success:true,
        message:"now you are following "+ toUser.username,
    })
    } catch (error) {
        res.status(500).json({
        success:false,
        message:error.message
    }) 
    }
}
export const unFollowUser=async(req,res)=>{
    try {
    const {userId}=req.auth()
    const {id}=req.body
    const user=await FaceUser.findById(userId)
    const toUser=await FaceUser.findById(id)
    if(!user.following.includes(id)){
        return res.status(404).json({
            success:false,
            message:"you are already unfollowing "+toUser.username,
        })
    }
    user.following=user.following.filter(user=>user !==id)
    toUser.followers=toUser.followers.filter(user=>user !==userId)
    await user.save()
    await toUser.save()
    res.status(200).json({
        success:true,
        message:"now you are unfollowing "+ toUser.username,
    })
    } catch (error) {
        res.status(500).json({
        success:false,
        message:error.message
    }) 
    }
}
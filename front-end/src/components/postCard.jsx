import { useState } from "react"
import { dummyUserData } from "../assets/assets"
import { BadgeCheck, Heart, MessageCircle, Share2 } from "lucide-react"
import moment from "moment"
import { useNavigate } from "react-router-dom"
export default function PostCard(posts) {
    const navigate=useNavigate()
    const post =posts.post
    const postWithHashtags = post.content?.replace(
  /(#\w+)/g,
  `<span class="text-indigo-600">$1</span>`
)

    const [likes,setLikes]=useState(post.likes_count)
    const currentUser=dummyUserData
    const handleLikes=async()=>{

    }
    return (
    <div className="bg-white space-y-4 w-full max-w-2xl p-4 shadow rounded-xl">
      <div >
        <img onClick={()=>navigate(`/profile/${post.user_id}`)} className="w-10 h-10 cursor-pointer rounded-full shadow" src={post.user?.profile_picture} alt="" />
        <div className="">
            <div onClick={()=>navigate(`/profile/${post.user_id}`)} className="flex items-center cursor-pointer  space-x-1 ">
                <span>
                    {post.user?.full_name}
                </span>
                <BadgeCheck className="w-4 h-4 text-blue-500"/>
            </div>
            <div onClick={()=>navigate(`/profile/${post.user_id}`)} className="text-gray-500 cursor-pointer  text-sm">
                {post.user?.username} . {moment(post.createdAt).fromNow()}
            </div>
        </div>
        <div className=" my-2 ">
        {
            post.content && <div dangerouslySetInnerHTML={{__html: postWithHashtags}} className="text-gray-800 text-sm whitespace-pre-line"/>
        }
        </div>
        <div className="grid grid-cols-2 gap-2">
            {
                post.image_urls?.map((img,index)=>(
                    <img src={img} key={index} className={`w-full h-48 object-cover rounded-lg 
                        ${post.image_urls.length===1&&"col-span-2 h-auto"}`} alt="" />
                ))
            }
        </div>
        <div className="flex justify-start gap-2  pt-2 border-t border-gray-300  md:gap-4 items-center">
            <div className="flex-cent text-sm gap-2.5">
                <Heart  className={`w-4 h-4 cursor-pointer ${likes?.includes(currentUser._id)&&"text-red-500 fill-red-500"}`}
                onClick={()=>handleLikes()}
                />
                <span>{likes?.length}</span>
            </div>
            <div className="flex-cent gap-1">
                <MessageCircle className="w-4 h-4"/>
                <span>{12}</span>
            </div>
            <div className="flex-cent gap-1">
                <Share2 className="w-4 h-4"/>
                <span></span>
            </div>
        </div>
      </div>
    </div>
  )
}

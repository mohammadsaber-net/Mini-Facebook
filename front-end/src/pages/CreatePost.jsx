import { useState } from "react"
import { dummyUserData } from "../assets/assets.js"
import { Image, X } from "lucide-react"
import {toast} from "react-hot-toast"

function CreatePosts(){
    const data=dummyUserData
    const [content,setContent]=useState("")
    const [image,setImage]=useState([])
    const [loading,setLoading]=useState(false)
    const handleSubmit=async()=>{

    }
    return(
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto p-6">
            <div className="mb-6">
                <h2 className="text-2xl bg-white text-slate-900 mb-2">
                    Create Post
                </h2>
                <p className="text-slate-600">
                    Share your thoughts with world
                </p>
            </div>
            <div className="max-w-xl p-4 bg-white rounded-xl shadow-md space-y-4">
                <div className="flex items-center gap-3">
                    <img src={data.profile_picture} className="size-12" alt="" />
                    <div>
                        <h3 className="font-semibold ">
                            {data.full_name}
                        </h3>
                        <p className="text-sm text-gray-500 ">
                            @{data.username}
                        </p>
                    </div>
                </div>
                <textarea name="" className="w-full resize-none max-h-20 text-sm outline-none placeholder-gray-400" id="" placeholder="what's happeing" onChange={(e)=>setContent(e.target.value)} value={content}></textarea>
                {
                    image.length > 0 && <div className="flex flex-wrap gap-2 p-2">
                        {
                            image.map((img,index)=>(
                                <div key={index} className="relative group">
                                    <img src={URL.createObjectURL(img)} className="h-20 rounded-md" alt="" />
                                    <div className="absolute hidden group-hover:flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-black/40 rounded-md cursor-pointer" onClick={()=>setImage(image.filter((_,i)=>i !== index))}>
                                    <X className="text-white"/>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
                <div className="flex items-center justify-between pt-3 border-t text-gray-300">
                    <label htmlFor="images" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer">
                        <Image className="size-6 "/>  
                    </label>
                        <input type="file" id="images" accept="image/*" hidden multiple onChange={(e)=>setImage([...image,...e.target.files])}/>
                        <button onClick={()=>toast.promise(
                            handleSubmit(),{
                            loading:"uploading",
                            error:<p>Post not added</p>,
                            success:<p>Post Added</p>
                                }
                            )} className="flex-cent text-sm bg-gradient-to-r from-indigo-500 
                            to-purple-600 hover:from-indigo-600 active:scale-95 transition 
                            text-white font-medium px-8 py-2 rounded-md cursor-pointer 
                            hover:to-purple-700" disabled={loading} >
                                Puplish post 
                        </button>
                 </div>
            </div>
        </div>  
    </div>
    )
}
export default CreatePosts
import { ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function StoryModel({setShowModel,fetchStories}) {
    const bgColor=["red","blue","gray","green"]
    const [mode,setMode]=useState("text")
    const [backg,setBackg]=useState(bgColor[0])
    const [media,setmedia]=useState(null)
    const [text,setText]=useState("text")
    const [preview,setPreview]=useState(null)
    const handleMedia=(e)=>{
        const file=e.target.files?.[0]
        if(file){
            setMode(file)
            setPreview(urlCreateObjectUrl(file))

        }
    }
    const createStory=()=>{
        console.log("created")
    }
  return (
    <div style={{backgroundColor:"rgba(0, 0, 0, 0.26)"}} className='flex items-center justify-center top-0 left-0 bottom-0 right-0 z-20 fixed'>
      <div className='w-full max-w-md'>
        <div className=' text-center flex justify-between items-center'>
            <button className='cursor-pointer hover:text-blue-600 transition-all duration-300 p-2' onClick={()=>setShowModel(false)}>
                <ArrowLeft size={30}/>
            </button>
            <h2 className='text-lg hover:text-blue-600 transition-all duration-300 font-semibold'>
                create-story
            </h2>
            <span className='w-10'></span>
        </div>
        <div className='flex items-center rounded-lg md:h-64 h-32 justify-center relative' style={{backgroundColor:backg}}>
            {mode==="text"&&(
                <textarea onChange={(e)=>setText(e.target.value)} value={text} name="" placeholder='whats in your mind' className='bg-transparent text-white w-full p-4 h-full resize-none text-lg focus:outline-none' id=""></textarea>
            )}
            {
                mode==="media"&&preview&&(
                    media?.type.startsWith("image")?(
                        <img src={preview} className='object-contain max-h-full'/>
                    ):(
                        <video src={preview} className='object-contain max-h-full'/>
                    )
                )
            }
        </div>
        <div className='flex gap-2 mt-2'>
            {bgColor.map((color)=>(
                <button onClick={()=>setBackg(color)} style={{backgroundColor:color}} className='cursor-pointer w-6 h-6 rounded-full' key={color}>
                </button>
            ))}
        </div>
        <div className='flex gap-2 mt-2'>
            <button onClick={()=>{setMode("text");setmedia(null);setPreview(null)}}
                className={`flex flex-1 items-center cursor-pointer justify-center gap-2 p-2 rounded-sm ${mode==="text"?"bg-white text-black":"bg-zinc-800"}`}>
                    <TextIcon  size={18}/>
                </button>
                <label htmlFor="image/video" className={`flex-1 flex text-white px-2 py-1 rounded-sm items-center justify-center gap-2 cursor-pointer ${mode==="media"?"bg-white text-black":"bg-zinc-800"}`}>
                    <input onChange={(e)=>{handleMedia(e);setMode("media")}} id='image/video' type="file" accept='image/*, video/*' className='hidden' />
                    <Upload size={18}/>photo/video
                </label>
        </div>
        <button onClick={()=>toast.promise(createStory(),{
            loading:"saving...",
            success:<p>story added</p>,
            error:e=><p>{e.message}</p>
        })} className='flex-cent w-full mt-2 cursor-pointer rounded-lg py-1 gap-2 bg-gradient-to-r from-indigo-500 to-indigo-700 active:scale-95 hover:from-indigo-700 hover:to-indigo-900 text-white'>
            <Sparkle /> Create Story
        </button>
      </div>
    </div>
  )
}

export default StoryModel

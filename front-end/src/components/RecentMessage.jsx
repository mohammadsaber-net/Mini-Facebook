import React, { useEffect, useState } from 'react'
import { assets, dummyMessagesData } from '../assets/assets'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default function RecentMessage() {
    const [message,setMessage]=useState([])
    const fetchMessage=async()=>{
        setMessage(dummyMessagesData)
    }
    useEffect(()=>{
        fetchMessage()
    },[])
  return (
    <div className='w-fit min-h-20 rounded-md shadow text-xs p-1 text-slate-800'>
      <h3 className='font-semibold text-slate-800 mb-4'>recent messages</h3>
      <div className='flex flex-col max-h-36 no-scrollbar overflow-y-scroll'>
        {message.map((mes,ind)=>{
            return(<Link to={`/messages/${mes._id}`} key={ind} className='flex group items-center p-1 hover:bg-blue-400 transition-all hover:text-white duration-200 mb-2 shadow'
            >
                <img src={mes.profile_picture || assets.sample_profile} className='w-8 h-8 rounded-full' alt="" />
                <div className='w-full ms-2'>
                    <div className='flex justify-between'>
                        <p className='font-medium w-4 overflow-hidden'>{mes.from_user_id.full_name || "ali"}</p>
                        <p className='text-[8px]'>{moment(mes.createdAt).fromNow()}</p>
                    </div>
                    <div className='flex justify-between'>
                       <p className='text-gray-500 group-hover:!text-white transition-colors duration-200'>
                        {mes.text?mes.text:"media"}
                        </p> 
                        {
                            !mes.seen&& <p className='bg-indigo-500 text-white w-4 h-4 flex-cent rounded-full text-[10px]'>1</p>
                        }
                    </div>
                </div>
            </Link>
        )})}
      </div>
    </div>
  )
}

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets, dummyUserData } from '../assets/assets'
import { useClerk, UserButton } from '@clerk/clerk-react'
import { CirclePlus, LogOut } from 'lucide-react'
import MenuItems from './menuItems'

export default function SideBar({sideOpen,setSideOpen}) {
    const navigate=useNavigate()
    const user=dummyUserData
    const {signOut}=useClerk()
  return (
    <div className={`w-44 absolute top-0 left-0 sm:relative z-50 sm:w-60 pt-4 border-gray-300 border-e-2 bg-white ${sideOpen?"-translate-x-0":"max-sm:-translate-x-full"}  transition-all duration-300 ease-in-out`}>
      <div className="w-full">
    <img onClick={()=>navigate("/")} className='w-26 mb-10 md:mb-15 ml-7 cursor-pointer' src={assets.logo} alt="logo" />
      
      <hr className='border-gray-300 mb-8'/>
      <MenuItems setSideOpen={setSideOpen}/>
      <Link to={"/createPost"} className='flex w-fit m-auto px-4 md:px-8 border-b-2 border-gray-300 py-2 rounded-xl gap-2 bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 duration-300 transition-all from-blue-700 to-blue-900  text-white'>
      <CirclePlus />
      createPost
      </Link>
      </div>
      <div className='w-full flex items-start flex-col border-t-2 mt-10 border-gray-300 p-4'>
        <UserButton />
        <div>
            <h1>{user.full_name}</h1>
            <p className='text-gray-400'>@{user.username}</p>
        </div>
        <LogOut onClick={signOut} className='cursor-pointer w-6 text-3xl text-gray-400 m-auto hover:text-gray-700 transition-all'/>
      </div>
    </div>
  )
}

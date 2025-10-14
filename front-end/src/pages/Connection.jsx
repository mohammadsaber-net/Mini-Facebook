import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { dummyConnectionsData, dummyFollowersData, dummyFollowingData, dummyPendingConnectionsData } from "../assets/assets.js"
import { MessageSquare, User, Users } from "lucide-react"

function Connection(){
    const followers=dummyFollowersData
    const connection=dummyConnectionsData
    const following=dummyFollowingData
    const pendingConnections=dummyPendingConnectionsData
    const navigate=useNavigate()
    const [currentTab,setCurrentTab]=useState("followers")

    const dataArray=[
        {
            label:"followers",
            value:followers,
            icon:Users
        },
        {
            label:"following",
            value:following,
            icon:Users
        },
        {
            label:"pending",
            value:pendingConnections,
            icon:Users
        },
        {
            label:"connections",
            value:connection,
            icon:Users
        }
    ]
    return(
        <div className="min-h-screen  bg-slate-50">
            <div className="max-w-6xl mx-auto p-2">
                <div className="mb-8">
                    <h2 className="font-bold mb-2 text-3xl text-slate-900">connections</h2>
                    <p className="text-slate-600">
                        manage your network and discover new connections
                    </p>

                </div>
                <div className="mb-8 flex flex-wrap gap-2">
                    {
                        dataArray.map((item,index)=>(
                            <div key={index} className="flex p-1 flex-col items-center justify-center gap-1 border border-gray-200 bg-white shadow rounded-md">
                                <p>{item.value.length}</p>
                                <p className="text-sky-600">{item.label}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="inline-flex flex-wrap items-center border border-gray-200 rounded-md p-1 w-fit bg-white shadow-sm">
                    {
                        dataArray.map((item)=>(
                            <div className={`${currentTab===item.label?"bg-white font-medium text-black":"text-gray-500 hover:text-black"} flex items-center px-3 py-1 rounded-md transition-all duration-300 cursor-pointer `} key={item.label} onClick={()=>setCurrentTab(item.label)}> 
                            <item.icon className="size-4" />
                            <span className="ml-1">{item.label}</span>
                            {
                                item.count !==undefined&&
                                    <span className="bg-gray-100 rounded-full py-0.5">{item.label}</span>
                                
                            }
                            </div>
                        ))
                    }

                </div>
                <div className="flex flex-wrap max-w-96">
                    {
                        dataArray.find((item)=>(item.label===currentTab)).value.map((user)=>(
                            <div key={user._id} className="w-full my-2 flex ga-5 bg-white shadow rounded-lg p-6">
                                <img src={user.profile_picture} alt="" className="size-12 rounded-full shadow-md" />
                                <div className="flex-1">
                                    <p className="text-slate-600">{user.full_name}</p>
                                    <p className="text-slate-500">@{user.username}</p>
                                    <p className="text-slate-700">{user.bio.slice(0,30)}...</p>
                                    <div className="flex max-sm:flex-col gap-2 mt-4">
                                        {
                                            <button onClick={()=>navigate(`/profile/${user._id}`)} className="p-2 text-sm rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-700 text-white hover:from-indigo-600 hover:to-indigo-800  hover:bg-sky-200 cursor-pointer active:scale-95 w-full transition-all duration-300">
                                                View profile
                                            </button>
                                        }
                                        {
                                            currentTab==="following"&&(
                                                <button className="p-2 text-sm rounded-2xl bg-slate-100 hover:bg-sky-200 cursor-pointer active:scale-95 w-full transition-all duration-300">
                                                    Unfollow
                                                </button>
                                            )
                                        }
                                        {
                                            currentTab==="pending"&&(
                                                <button className="p-2 text-sm rounded-2xl bg-slate-100 hover:bg-sky-200 cursor-pointer active:scale-95 w-full transition-all duration-300">
                                                    accept
                                                </button>
                                            )
                                        }
                                        {
                                            currentTab==="connections"&&(
                                                <button onClick={()=>navigate(`/messages/${user._id}`)} className="p-2 text-sm rounded-2xl bg-slate-100 flex-cent gap-2 hover:bg-sky-200 cursor-pointer active:scale-95 w-full transition-all duration-300">
                                                    <MessageSquare className="size-4 "/>
                                                    message
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default Connection
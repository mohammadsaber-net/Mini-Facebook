import { useState } from "react"
import {assets, dummyConnectionsData} from "../assets/assets.js"
import { Search } from "lucide-react"
import UserCard from "../components/UserCard.jsx"
import Loading from "../components/Loading.jsx"
function Discover(){
    const [input,setInput]=useState("")
    const [users,setUsers]=useState(dummyConnectionsData)
    const [loading,setLoading]=useState(false)
    const [searchPlace,setSearchplace]=useState(false)
    const handleSearch=async(e)=>{
        if(e.key==="Enter"){
            console.log(e.key)
            setUsers([])
            setLoading(true)
            setTimeout(() => {
               setUsers(dummyConnectionsData)
               setLoading(false) 
            }, 1000);
        }
    }
    return(
        <div className="min-h-screen bg-gray-100">
            <div className="mx-auto p-6 max-w-6xl">
                <div>
                    <h2 className="font-bold text-3xl text-slate-900 mb-2">
                        Discover People
                    </h2>
                    <p>
                        connect with amazing People and grow your network
                    </p>
                </div>
                    <div className="mb-8
                     shadow-md rounded-md border bg-white/80 border-slate-200/60">
                        <div className="p-2">
                            <div className="relative">
                                <Search className={`absolute transition-all duration-300 bg-white size-8 ${searchPlace?"-left-2 -top-2":"left-2 top-1/2 transform -translate-y-1/2"}  text-slate-400 h-5`}/>
                                <input
                                onFocus={()=>setSearchplace(true)}
                                onBlur={()=>setSearchplace(false)}
                                onChange={(e)=>setInput(e.target.value)} value={input} onKeyUp={handleSearch} type="text" className="w-full pl-10 py-2 border border-gray-300 rounded-md max-sm:text-sm focus:outline-none" placeholder="search py name, region and username" />

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6 ">
                        {
                            users.map((user)=>(
                                <UserCard user={user} key={user._id} />
                            ))
                        }
                    </div>
                    {
                        loading&&(<Loading />)
                    }
            </div>

        </div>
    )
}
export default Discover

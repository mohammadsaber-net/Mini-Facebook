import { LogOut, Menu, X } from "lucide-react"
import Loading from "../components/Loading"
import { dummyUserData } from "../assets/assets.js"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import SideBar from "../components/sideBar.jsx"

function LayOut(){
    const user=dummyUserData
    const [sideOpen,setSideOpen]=useState()
    return user?(
        <div className="w-full relative flex h-screen">
            <SideBar sideOpen={sideOpen} setSideOpen={setSideOpen} />
            <div className="ms-6">
                <Outlet />
            </div>
            <div className={`sm:hidden absolute top-0 z-50 ${sideOpen?"left-44":" left-0"} transition-all duration-300`}>
            {sideOpen?<X onClick={()=>setSideOpen(false)}/>:<Menu  onClick={()=>setSideOpen(true)}/>}
            </div>
        </div>
    ):(
        <Loading />
    )
}
export default LayOut
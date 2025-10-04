import { useEffect, useState } from "react"
import { dummyPostsData } from "../assets/assets.js"
import Loading from "../components/Loading.jsx"
import StoriesBar from "../components/StoriesBar.jsx"

function Feed(){
    const [feeds,setFeeds]=useState([])
    const [loading,setLoading]=useState(true)
    const fetchFeed= async()=>{
        setFeeds(dummyPostsData)
        setLoading(false)
    }
    useEffect(()=>{
        fetchFeed()
    },[])
    return !loading?(
        <div className="h-full overflow-y-scroll flex items-start mt-4 justify-center xl:gap-8 xl:pr-5">
             {/* w-screen sm:w-[calc(100vw-240px)]  */}
            <div>
        <StoriesBar />
                <div className="p-4 space-y-6">
                list of posts
            </div>
            </div>
            <h1>sponsored</h1>
        </div>
    ):<Loading />
}
export default Feed
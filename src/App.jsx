import {Route , Routes } from "react-router-dom"
import Feed from "./pages/Feed"
import Login from "./pages/Login"
import Message from "./pages/message"
import CreatePosts from "./pages/CreatePost"
import Discover from "./pages/Discover"
import LayOut from "./pages/LayOut"
import Profile from "./pages/Profile"
import { useUser } from "@clerk/clerk-react"
import Connection from "./pages/Connection"
import {Toaster} from "react-hot-toast"
import ChatBox from "./pages/ChatPox"

function App() {
  const {user}=useUser() 
  return (
    <>
    <Toaster />
    <Routes>
    <Route path="/" element={!user?<Login />:<LayOut />}>
      <Route index element={<Feed />}/>
      <Route path="/messages" element={<Message />}/>
      <Route path="/messages/:usedId" element={<ChatBox />}/>
      <Route path="/connections" element={<Connection />}/>
      <Route path="/createPost" element={<CreatePosts />}/>
      <Route path="/discover" element={<Discover />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/profile/:profileId" element={<Profile />}/>
    </Route>
    </Routes>
    </>
  )
}

export default App

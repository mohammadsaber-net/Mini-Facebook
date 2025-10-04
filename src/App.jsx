import {Route , Routes } from "react-router-dom"
import Feed from "./pages/Feed"
import Login from "./pages/Login"
import Message from "./pages/message"
import ChatBox from "./pages/chatPox"
import CreatePosts from "./pages/createPost"
import Discover from "./pages/Discover"
import LayOut from "./pages/layOut"
import Profile from "./pages/profile"
import { useUser } from "@clerk/clerk-react"
import Connection from "./pages/Connection"
function App() {
  const {user}=useUser() 
  return (
    <>
    <Routes>
    <Route path="/" element={!user?<Login />:<LayOut />}>
      <Route index element={<Feed />}/>
      <Route path="/messages" element={<Message />}/>
      <Route path="/messages/:usedId" element={<Message />}/>
      <Route path="/connections" element={<Connection />}/>
      <Route path="/createPost" element={<CreatePosts />}/>
      <Route path="/discover" element={<Discover />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/profile/profileId" element={<Profile />}/>
    </Route>
    </Routes>
    </>
  )
}

export default App

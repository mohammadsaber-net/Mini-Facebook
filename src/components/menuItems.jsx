
import { Link, NavLink} from 'react-router-dom'
import { Home,MessageCircle,Users,Search,UserIcon } from 'lucide-react'

export default function MenuItems() {
  return (
    <div className='px-6 mb-2 text-gray-600 font-medium flex flex-col gap-2'>
      <NavLink 
      className={({ isActive }) =>
          `flex gap-2 px-2 py-1 rounded-2xl transition-all duration-300 
          hover:bg-gray-200 ${isActive ? "bg-gray-300 text-indigo-600" : ""}`
        }
      to={"/"}><Home />Feed</NavLink>
      <NavLink className={({ isActive }) =>
          `flex gap-2 px-2 py-1 rounded-2xl transition-all duration-300 
          hover:bg-gray-200 ${isActive ? "bg-gray-300 text-indigo-600" : ""}`
        }to={"/messages"}><MessageCircle /> messages</NavLink>
      <NavLink className={({ isActive }) =>
          `flex gap-2 px-2 py-1 rounded-2xl transition-all duration-300 
          hover:bg-gray-200 ${isActive ? "bg-gray-300 text-indigo-600" : ""}`
        }  to={"/connections"}> <Users />connections</NavLink>
      <NavLink className={({ isActive }) =>
          `flex gap-2 px-2 py-1 rounded-2xl transition-all duration-300 
          hover:bg-gray-200 ${isActive ? "bg-gray-300 text-indigo-600" : ""}`
        }  to={"/discover"}><Search />discover</NavLink>
      <NavLink className={({ isActive }) =>
          `flex gap-2 px-2 py-1 rounded-2xl transition-all duration-300 
          hover:bg-gray-200 ${isActive ? "bg-gray-300 text-indigo-600" : ""}`
        }  to={"/profile"}><UserIcon /> profile</NavLink>
    </div>
  )
}

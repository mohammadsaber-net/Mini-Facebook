import { Calendar, MapPin, PenBox, Verified } from 'lucide-react'
import moment from 'moment'
import React from 'react'

export default function UserProfileInfo(param) {
  const {addPost,addUser,profileId,setShowEdit}=param
  return (
    <div className='relative bg-white md:px-8 py-4 px-6'>
      <div className='flex flex-col md:flex-row items-start gap-6'>
        <div className='size-32 border-4 border-white shadow-lg absolute rounded-full -top-16'>
            <img src={addUser.profile_picture} className='absolute rounded-full z-20' alt="" />
            
        </div>
        <div className='w-full pt-16 md:pt-0 md:pl-36'>
                <div className='flex flex-col md:flex-row items-start justify-between'>
                    <div>
                        <div className='flex items-center gap-3 '>
                               <h2 className='text-2xl font-bold text-gray-900 '>
                                {
                                    addUser.full_name
                                }
                                </h2>
                                <Verified className='text-blue-500 size-6'/>
                        </div>
                        <p>{addUser.username?`@${addUser.username}`:"add a username"}</p>
                    </div>
                    {
                        !profileId && <button onClick={()=>setShowEdit(true)} className='flex  items-center gap-2 border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded-lg font-medium transition-colors mt-4 md:mt-0 cursor-pointer'>
                          Edit
                          <PenBox />
                        </button>
                    }
                </div>
                <p className='text-gray-700 text-sm max-w-md mt-4 '>
                    {addUser.bio}
                </p>
                <div className='flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mt-4'>
                    <span className='flex items-center gap-2'>
                      <MapPin className='size-4'/> {
                        addUser.location?addUser.location:"add location"
                      }
                    </span>
                    <span className='flex items-center gap-1'>
                      <Calendar className='size-4'/> Joined
                      {
                      moment(addUser.createdAt).fromNow()
                    }
                    </span>                    
                </div>
                <div className='flex gap-4 items-center border border-gray-200  pt-4'>
                  <div className='flex gap-2 items-center'>
                    <span className='font-bold sm:text-xl text-gray-900'>
                      {
                        addPost.length
                      }
                    </span>
                    <span className='text-xs sm:text-sm text-gray-500'>
                      Posts
                    </span>
                  </div >
                  <div className='flex gap-2 items-center'>
                    <span className='font-bold sm:text-xl text-gray-900'>
                      {
                        addUser.followers.length
                      }
                    </span>
                    <span className='text-xs sm:text-sm text-gray-500'>
                      Followers
                    </span>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <span className='font-bold sm:text-xl text-gray-900'>
                      {
                        addUser.following.length
                      }
                    </span>
                    <span className='text-xs sm:text-sm text-gray-500'>
                      Following
                    </span>
                  </div>
                </div>
            </div>
      </div>
    </div>
  )
}
